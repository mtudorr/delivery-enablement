import { Duration } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as nodeJsLambda from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import path = require("path");
import { Secrets } from "./secrets";
import { Configuration } from "./configuration";

const MemoryB = 1024;
const TimeoutB = Duration.seconds(10);

export class Lambda {
    public readonly functionEventsGitHub: nodeJsLambda.NodejsFunction;

    public constructor(scope: Construct, secrets: Secrets) {
        const dirWebhooks = path.join(__dirname, "..", "..", "..", "projects", "webhooks");
        const configuration = new Configuration(scope);

        const roleExecution = new iam.Role(scope, "Iam/Lambda-Execution", {
            roleName: "delivery-enablement-webhooks-lambda-execution",
            assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com")
        });
        roleExecution.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole"));
        roleExecution.addManagedPolicy(new iam.ManagedPolicy(scope, "Iam/Read-Secret-GitHub-Key", {
            managedPolicyName: "delivery-enablement-webhooks-read-secrets",
            statements: [
                new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: [
                        "secretsmanager:GetSecretValue"
                    ],
                    resources: [
                        secrets.webhooksGitHubKey.secretArn,
                        secrets.webhooksStacksKey.secretArn,
                        secrets.rollbarAccessToken.secretArn
                    ]
                })
            ]
        }));

        const environment: Record<string, string> = {
            SECRET_NAME_GITHUB_KEY: secrets.webhooksGitHubKey.secretName,
            SECRET_NAME_STACKS_KEY: secrets.webhooksStacksKey.secretName,
            SECRET_NAME_ROLLBAR_ACCESS_TOKEN: secrets.rollbarAccessToken.secretName,
            API_STACKS_ROOT: configuration.apiStacksRoot
        };

        this.functionEventsGitHub = new nodeJsLambda.NodejsFunction(scope,
            "Lambda/Webhooks-Events-GitHub", {
                functionName: "delivery-enablement-webhooks-events-github",
                memorySize: MemoryB,
                timeout: TimeoutB,
                entry: path.join(dirWebhooks, "events-github.ts"),
                handler: "handler",
                role: roleExecution,
                environment
            });
    }
}