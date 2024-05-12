import { Duration } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as nodeJsLambda from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import path = require("path");
import { Secrets } from "./secrets";

const MemoryB = 1024;
const TimeoutB = Duration.seconds(10);

export class Lambda {

    public readonly functionEventsGitHub: nodeJsLambda.NodejsFunction;

    public constructor(scope: Construct, secrets: Secrets) {
        const dirWebhooks = path.join(__dirname, "..", "..", "projects", "webhooks");
        
        const roleExecution = new iam.Role(scope, "Iam/Lambda-Execution", {
            roleName: "delivery-enablement-lambda-execution",
            assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com")
        });
        roleExecution.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole"));
        roleExecution.addManagedPolicy(new iam.ManagedPolicy(scope, "Iam/Lambda-Read-Secret-GitHub-Key", {
            managedPolicyName: "delivery-enablement-read-secret-github-key",
            statements: [
                new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: [
                        "secretsmanager:GetSecretValue"
                    ],
                    resources: [
                        secrets.webhooksGitHubKey.secretArn
                    ]
                })
            ]
        }));

        this.functionEventsGitHub = new nodeJsLambda.NodejsFunction(scope,
            "Lambda/Webhooks-Events-GitHub", {
                functionName: "delivery-enablement-events-github",
                memorySize: MemoryB,
                timeout: TimeoutB,
                entry: path.join(dirWebhooks, "events-github.ts"),
                handler: "handler",
                role: roleExecution,
                environment: {
                    SECRET_NAME_GITHUB_KEY: secrets.webhooksGitHubKey.secretName
                }
            });
    }
}