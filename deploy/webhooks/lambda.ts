import { Duration } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as nodeJsLambda from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import path = require("path");

const MemoryB = 1024;
const TimeoutB = Duration.seconds(10);

export class Lambda {

    public readonly functionEventsGitHub: nodeJsLambda.NodejsFunction;

    public constructor(scope: Construct) {
        const dirWebhooks = path.join(__dirname, "..", "..", "projects", "webhooks");
        
        const roleExecution = new iam.Role(scope, "Iam/Lambda-Execution", {
            roleName: "delivery-enablement-lambda-execution",
            assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com")
        });
        roleExecution.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole"));

        this.functionEventsGitHub = new nodeJsLambda.NodejsFunction(scope,
            "Lambda/Webhooks-Events-GitHub", {
                functionName: "delivery-enablement-events-github",
                memorySize: MemoryB,
                timeout: TimeoutB,
                entry: path.join(dirWebhooks, "events-github.ts"),
                handler: "handler",
                role: roleExecution
            });
    }
}