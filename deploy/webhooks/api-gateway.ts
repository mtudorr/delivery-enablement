import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { Lambda } from "./lambda";

export class ApiGateway {
    public readonly resourceV1: apiGateway.Resource;
    public readonly resourceV1Events: apiGateway.Resource;
    public readonly resourceV1EventsGitHub: apiGateway.Resource;

    public constructor(scope: Construct, lambda: Lambda) {
        const restApi = new apiGateway.RestApi(scope, "Api/Webhooks", {
            restApiName: "delivery-enablement-webhooks",
            deployOptions: {
                stageName: "main"
            }
        });

        new apiGateway.UsagePlan(scope, "Api/Webhooks-GitHub-Usage-Plan", {
            name: "delivery-enablement-webhooks-github",
            apiStages: [
                {
                    api: restApi,
                    stage: restApi.deploymentStage
                }
            ]
        });

        this.resourceV1 = restApi.root.addResource("v1");
        this.resourceV1Events = this.resourceV1.addResource("events");
        this.resourceV1EventsGitHub = this.resourceV1Events.addResource("github");

        const integrationOfEventsGitHub = new apiGateway.LambdaIntegration(lambda.functionEventsGitHub);
        new apiGateway.Method(scope, "Api/Webhooks-V1-Events-GitHub-Post", {
            resource: this.resourceV1EventsGitHub,
            httpMethod: "POST",
            integration: integrationOfEventsGitHub,
            options: {
                apiKeyRequired: false
            }
        });
    }
}