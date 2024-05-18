import * as cdk from 'aws-cdk-lib';
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ecrAssets from "aws-cdk-lib/aws-ecr-assets";
import { Construct } from 'constructs';
import path = require('path');

export class ExecStack extends cdk.Stack {
    public constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        var stack = this;

        var directoryExec = path.join(__dirname, "..", "..", "..", "projects", "exec");
        var taskCreateDockerImage = new ecrAssets.DockerImageAsset(stack, "Docker/TaskCreate", {
            directory: directoryExec,
            file: "create.dockerfile"
        });

        var taskCreateDefinition = new ecs.FargateTaskDefinition(stack, "Fargate/TaskDefinition-Create", {
            taskRole: undefined, // TODO
            executionRole: undefined, // TODO
        });
        taskCreateDefinition.addContainer("Create", {
            image: ecs.ContainerImage.fromDockerImageAsset(taskCreateDockerImage),
            logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'delivery-enablement-create', logRetention: 1 }),
            environment: {
                "GITHUB_OAUTH_TOKEN": cdk.SecretValue.secretsManager("GitHub-OAuth-Token").unsafeUnwrap().toString()
            }
         })

        var cluster = new ecs.Cluster(stack, "Ecs/Cluster", {
            clusterName: "delivery-enablement-cluster",
            vpc: undefined, // TODO
        });
        new ecs.FargateService(stack, "Fargate/Service-Create", {
            serviceName: "delivery-enablement-create",
            cluster: cluster,
            taskDefinition: taskCreateDefinition,
            desiredCount: 0
        });
    }
}