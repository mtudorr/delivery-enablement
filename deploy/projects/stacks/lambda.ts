import { Duration } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as nodeJsLambda from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import path = require("path");
import { DynamoDb } from "./dynamo-db";

const MemoryB = 1024;
const TimeoutB = Duration.seconds(10);

export class Lambda {
    public readonly functionAcknowledgeCreate: nodeJsLambda.NodejsFunction;
    public readonly functionAcknowledgeBuild: nodeJsLambda.NodejsFunction;
    public readonly functionAcknowledgeRemove: nodeJsLambda.NodejsFunction;

    public readonly functionCreate: nodeJsLambda.NodejsFunction;
    public readonly functionBuild: nodeJsLambda.NodejsFunction;
    public readonly functionRemove: nodeJsLambda.NodejsFunction;

    public constructor(scope: Construct, dynamoDb: DynamoDb) {
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

        const environment: Record<string, string> = {
            "TABLE_STACKS_NAME": dynamoDb.tableStacks.tableName,
            "TABLE_STACKS_ARN": dynamoDb.tableStacks.tableArn
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
    }
}
