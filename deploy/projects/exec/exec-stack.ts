import * as cdk from 'aws-cdk-lib';
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ecrAssets from "aws-cdk-lib/aws-ecr-assets";
import { Construct } from 'constructs';
import path = require('path');

export class ExecStack extends cdk.Stack {
    public constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const stack = this;

        const directoryExec = path.join(__dirname, "..", "..", "..", "projects", "exec");
        const taskCreateDockerImage = new ecrAssets.DockerImageAsset(stack, "Docker/TaskCreate", {
            directory: directoryExec,
            file: "create.dockerfile"
        });

        const taskRole = new iam.Role(stack, "Iam/TaskExecutionRole", {
            roleName: "delivery-enablement-exec-task-role",
            assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com")
        });
        taskRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess"));

        const taskCreateDefinition = new ecs.FargateTaskDefinition(stack, "Fargate/TaskDefinition-Create", {
            taskRole: taskRole
        });
        taskCreateDefinition.addContainer("Create", {
            image: ecs.ContainerImage.fromDockerImageAsset(taskCreateDockerImage),
            logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'delivery-enablement-create', logRetention: 1 }),
            environment: {
                "GITHUB_OAUTH_TOKEN": cdk.SecretValue.secretsManager("GitHub-OAuth-Token").unsafeUnwrap().toString()
            }
        });

        const cluster = new ecs.Cluster(stack, "Ecs/Cluster", {
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