import * as cdk from 'aws-cdk-lib';
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecrAssets from "aws-cdk-lib/aws-ecr-assets";
import * as sns from "aws-cdk-lib/aws-sns";
import { Construct } from 'constructs';
import { Config } from '../../config';

import path = require('path');

export class ExecStack extends cdk.Stack {
    public readonly outputClusterArn = "DE-Output-Exec-Cluster-Arn";
    public readonly outputClusterName = "DE-Output-Exec-Cluster-Name";
    public readonly outputTaskCreateName = "DE-Output-Exec-Task-Create-Name";
    public readonly outputSnsTopicArn = "DE-Output-Exec-Sns-Topic-Arn";
    public readonly outputTaskRole = "DE-Output-Exec-Iam-Task-Role-Arn";
    public readonly outputTaskExecutionRole = "DE-Output-Exec-Iam-Task-Execution-Role-Arn";
    public readonly outputContainerCreateName = "DE-Output-Exec-Container-Create-Name";
    public readonly outputSecurityGroupId = "DE-Output-Exec-Security-Group-Id";
    public readonly outputSubnetId = "DE-Output-Exec-Subnet-Id";

    public constructor(scope: Construct, id: string, config: Config, props?: cdk.StackProps) {
        super(scope, id, props);

        const stack = this;

        const directoryExec = path.join(__dirname, "..", "..", "..", "projects", "exec");
        const snsTopic = new sns.Topic(stack, "Sns/Topic", {
            topicName: "delivery-enablement-notifications"
        });

        const taskCreateDockerImage = new ecrAssets.DockerImageAsset(stack, "Docker/TaskCreate", {
            directory: directoryExec,
            file: "create.dockerfile"
        });

        const taskRole = new iam.Role(stack, "Iam/TaskRole", {
            roleName: "delivery-enablement-exec-task-role",
            assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com")
        });
        taskRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess"));

        const taskExecutionRole = new iam.Role(stack, "Iam/TaskExecRole", {
            roleName: "delivery-enablement-exec-task-exec-role",
            assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com")
        });
        taskExecutionRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AmazonECSTaskExecutionRolePolicy"));

        const taskCreateDefinition = new ecs.FargateTaskDefinition(stack, "Fargate/TaskDefinition-Create", {
            family: "DE-Create",
            taskRole: taskRole,
            executionRole: taskExecutionRole,
            cpu: 1024,
            memoryLimitMiB: 2048
        });
        const containerCreate = taskCreateDefinition.addContainer("Create", {
            containerName: "DE-Create",
            image: ecs.ContainerImage.fromDockerImageAsset(taskCreateDockerImage),
            logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'delivery-enablement-create', logRetention: 1 }),
            environment: {
                "GITHUB_OAUTH_TOKEN": cdk.SecretValue.secretsManager("GitHub-OAuth-Token").unsafeUnwrap().toString(),
                "SNS_NOTIFICATIONS_ARN": snsTopic.topicArn,
                "SNS_NOTIFICATIONS_NAME": snsTopic.topicName
            }
        });

        const vpc = ec2.Vpc.fromLookup(stack, "Vpc/Default", {
            vpcId: config.vpcId
        });

        const subnets = vpc.selectSubnets({ subnetType: ec2.SubnetType.PUBLIC }).subnets;
        if (subnets.length === 0) {
            throw new Error("Could not find a suitable subnet");
        }

        const subnet = subnets[0];
 
        const cluster = new ecs.Cluster(stack, "Ecs/Cluster", {
            clusterName: "delivery-enablement-cluster",
            vpc: vpc
        });

        const securityGroup = new ec2.SecurityGroup(stack, "Vpc/SecurityGroup", {
            securityGroupName: "delivery-enablement-exec",
            vpc: cluster.vpc,
            allowAllOutbound: true
        });

        new cdk.CfnOutput(stack, "DE-Output-Exec-Task-Create-Name", {
            exportName: this.outputTaskCreateName,
            value: taskCreateDefinition.family
        });

        new cdk.CfnOutput(stack, "DE-Output-Exec-Cluster-Name", {
            exportName: this.outputClusterName,
            value: cluster.clusterName
        });

        new cdk.CfnOutput(stack, "DE-Output-Exec-Cluster-Arn", {
            exportName: this.outputClusterArn,
            value: cluster.clusterArn
        });

        new cdk.CfnOutput(stack, "DE-Output-Exec-Sns-Topic-Arn", {
            exportName: this.outputSnsTopicArn,
            value: snsTopic.topicArn
        });
        
        new cdk.CfnOutput(stack, "DE-Output-Exec-Iam-Task-Role-Arn", {
            exportName: this.outputTaskRole,
            value: taskRole.roleArn
        });

        new cdk.CfnOutput(stack, "DE-Output-Exec-Iam-Task-Exec-Role-Arn", {
            exportName: this.outputTaskExecutionRole,
            value: taskExecutionRole.roleArn
        });

        new cdk.CfnOutput(stack, "DE-Output-Exec-Container-Create-Name", {
            exportName: this.outputContainerCreateName,
            value: containerCreate.containerName
        });

        new cdk.CfnOutput(stack, "DE-Output-Exec-Security-Group-Id", {
            exportName: this.outputSecurityGroupId,
            value: securityGroup.securityGroupId
        });

        new cdk.CfnOutput(stack, "DE-Output-Exec-Subnet-Id", {
            exportName: this.outputSubnetId,
            value: subnet.subnetId
        });
    }
}