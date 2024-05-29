import { Duration, Fn } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as sns from "aws-cdk-lib/aws-sns";
import * as nodeJsLambda from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import path = require("path");
import { DynamoDb } from "./dynamo-db";
import { ExecStack } from "../exec/exec-stack";
import { Secrets } from "./secrets";

const MemoryB = 1024;
const TimeoutB = Duration.seconds(10);

export class Lambda {
    public readonly functionAcknowledgeCreate: nodeJsLambda.NodejsFunction;
    public readonly functionAcknowledgeBuild: nodeJsLambda.NodejsFunction;
    public readonly functionAcknowledgeRemove: nodeJsLambda.NodejsFunction;

    public readonly functionCreate: nodeJsLambda.NodejsFunction;
    public readonly functionBuild: nodeJsLambda.NodejsFunction;
    public readonly functionRemove: nodeJsLambda.NodejsFunction;

    public constructor(scope: Construct, execStack: ExecStack, dynamoDb: DynamoDb, secrets: Secrets) {
        const dirStacks = path.join(__dirname, "..", "..", "..", "projects", "stacks");

        const roleExecution = new iam.Role(scope, "Iam/Lambda-Execution", {
            roleName: "delivery-enablement-stacks-lambda-execution",
            assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com")
        });
        roleExecution.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole"));
        roleExecution.addManagedPolicy(new iam.ManagedPolicy(scope, "Iam/Read-Write-Table-Stacks", {
            managedPolicyName: "delivery-enablement-stacks-table-stacks-read-write",
            statements: [
                new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: [
                        "dynamodb:GetItem",
                        "dynamodb:Query",
                        "dynamodb:PutItem"
                    ],
                    resources: [
                        dynamoDb.tableStacks.tableArn,
                        `${dynamoDb.tableStacks.tableArn}/*`
                    ]
                })
            ]
        }));
        roleExecution.addManagedPolicy(new iam.ManagedPolicy(scope, "Iam/Run-Exec-Tasks", {
            managedPolicyName: "delivery-enablement-stacks-run-exec-tasks",
            statements: [
                new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: [
                        "ecs:RunTask"
                    ],
                    resources: [
                        "arn:aws:ecs:*:*:task-definition/DE-*"
                    ]
                }),
                new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: [
                        "iam:GetRole",
                        "iam:PassRole"
                    ],
                    resources: [
                        Fn.importValue(execStack.outputTaskRole),
                        Fn.importValue(execStack.outputTaskExecutionRole)
                    ]
                })
            ]
        }));
        roleExecution.addManagedPolicy(new iam.ManagedPolicy(scope, "Iam/Read-Secrets", {
            managedPolicyName: "delivery-enablement-stacks-read-secrets",
            statements: [
                new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: [
                        "secretsmanager:GetSecretValue"
                    ],
                    resources: [
                        secrets.rollbarAccessToken.secretArn
                    ]
                })
            ]
        }));

        const environment: Record<string, string> = {
            "SECRET_NAME_ROLLBAR_ACCESS_TOKEN": secrets.rollbarAccessToken.secretName,
            "TABLE_STACKS_NAME": dynamoDb.tableStacks.tableName,
            "TABLE_STACKS_ARN": dynamoDb.tableStacks.tableArn,
            "EXEC_CLUSTER_NAME": Fn.importValue(execStack.outputClusterName).toString(),
            "EXEC_CLUSTER_ARN": Fn.importValue(execStack.outputClusterArn).toString(),
            "EXEC_TASK_CREATE_NAME": Fn.importValue(execStack.outputTaskCreateName).toString(),
            "EXEC_CONTAINER_CREATE_NAME": Fn.importValue(execStack.outputContainerCreateName).toString(),
            "EXEC_TASK_BUILD_NAME": Fn.importValue(execStack.outputTaskBuildName).toString(),
            "EXEC_CONTAINER_BUILD_NAME": Fn.importValue(execStack.outputContainerBuildName).toString(),
            "EXEC_SECURITY_GROUP_ID": Fn.importValue(execStack.outputSecurityGroupId).toString(),
            "EXEC_SUBNET_ID": Fn.importValue(execStack.outputSubnetId).toString(),
        };

        this.functionAcknowledgeCreate = new nodeJsLambda.NodejsFunction(scope,
            "Lambda/Stacks-Create-Acknowledge", {
                functionName: "delivery-enablement-ack-stacks-create",
                memorySize: MemoryB,
                timeout: TimeoutB,
                entry: path.join(dirStacks, "acknowledge_create.ts"),
                handler: "handler",
                role: roleExecution,
                environment
            });

        this.functionAcknowledgeBuild = new nodeJsLambda.NodejsFunction(scope,
            "Lambda/Stacks-Build-Acknowledge", {
                functionName: "delivery-enablement-ack-stacks-build",
                memorySize: MemoryB,
                timeout: TimeoutB,
                entry: path.join(dirStacks, "acknowledge_build.ts"),
                handler: "handler",
                role: roleExecution,
                environment
            });

        this.functionAcknowledgeRemove = new nodeJsLambda.NodejsFunction(scope,
            "Lambda/Stacks-Remove-Acknowledge", {
                functionName: "delivery-enablement-ack-stacks-remove",
                memorySize: MemoryB,
                timeout: TimeoutB,
                entry: path.join(dirStacks, "acknowledge_remove.ts"),
                handler: "handler",
                role: roleExecution,
                environment
            });

        this.functionCreate = new nodeJsLambda.NodejsFunction(scope,
            "Lambda/Stacks-Create", {
                functionName: "delivery-enablement-stacks-create",
                memorySize: MemoryB,
                timeout: TimeoutB,
                entry: path.join(dirStacks, "create.ts"),
                handler: "handler",
                role: roleExecution,
                environment
            });

        this.functionBuild = new nodeJsLambda.NodejsFunction(scope,
            "Lambda/Stacks-Build", {
                functionName: "delivery-enablement-stacks-build",
                memorySize: MemoryB,
                timeout: TimeoutB,
                entry: path.join(dirStacks, "build.ts"),
                handler: "handler",
                role: roleExecution,
                environment
            });

        this.functionRemove = new nodeJsLambda.NodejsFunction(scope,
            "Lambda/Stacks-Remove", {
                functionName: "delivery-enablement-stacks-remove",
                memorySize: MemoryB,
                timeout: TimeoutB,
                entry: path.join(dirStacks, "remove.ts"),
                handler: "handler",
                role: roleExecution,
                environment
            });

        const functionAcknowledgeOutcomeNotification = new nodeJsLambda.NodejsFunction(scope,
            "Lambda/Stacks-Outcome-Notification-Acknowledge", {
                functionName: "delivery-enablement-stacks-ack-outcome-notification",
                memorySize: MemoryB,
                timeout: TimeoutB,
                entry: path.join(dirStacks, "acknowledge_outcome_notification.ts"),
                handler: "handler",
                role: roleExecution,
                environment
            });
        
        new sns.Subscription(scope, "Sns/Subscription/Outcome-Notification", {
            endpoint: functionAcknowledgeOutcomeNotification.functionArn,
            protocol: sns.SubscriptionProtocol.LAMBDA,
            topic: sns.Topic.fromTopicArn(scope, "Sns/Topic/Outcome-Notification", Fn.importValue(execStack.outputSnsTopicArn).toString())
        });
    }
}
