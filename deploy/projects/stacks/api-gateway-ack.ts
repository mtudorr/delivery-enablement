import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { Lambda } from "./lambda";

export class ApiGatewayAck {
    public readonly restApi: apiGateway.RestApi;
    public readonly apiKey: apiGateway.ApiKey;

    public readonly resourceV1: apiGateway.Resource;
    public readonly resourceV1Repos: apiGateway.Resource;
    public readonly resourceV1Repo: apiGateway.Resource;
    public readonly resourceV1RepoBranches: apiGateway.Resource;
    public readonly resourceV1RepoBranch: apiGateway.Resource;
    public readonly resourceV1RepoBranchCreate: apiGateway.Resource;
    public readonly resourceV1RepoBranchCreateAck: apiGateway.Resource;
    public readonly resourceV1RepoBranchBuild: apiGateway.Resource;
    public readonly resourceV1RepoBranchBuildAck: apiGateway.Resource;
    public readonly resourceV1RepoBranchRemove: apiGateway.Resource;
    public readonly resourceV1RepoBranchRemoveAck: apiGateway.Resource;

    public constructor(scope: Construct, lambda: Lambda) {
        this.restApi = new apiGateway.RestApi(scope, "Api/Stacks-Ack", {
            restApiName: "delivery-enablement-stacks-ack",
            deployOptions: {
                stageName: "main"
            }
        });

        this.apiKey = new apiGateway.ApiKey(scope, "Api/Stacks-Exec-Key", {
            apiKeyName: "delivery-enablement-stacks-exec"
        });

        const usagePlan = new apiGateway.UsagePlan(scope, "Api/Stacks-Exec-Plan", {
            name: "delivery-enablement-stacks-exec",
            apiStages: [
                {
                    api: this.restApi,
                    stage: this.restApi.deploymentStage
                }
            ]
        });
        usagePlan.addApiKey(this.apiKey);

        this.resourceV1 = this.restApi.root.addResource("v1");
        this.resourceV1Repos = this.resourceV1.addResource("repos");
        this.resourceV1Repo = this.resourceV1Repos.addResource("{repo_name}");
        this.resourceV1RepoBranches = this.resourceV1Repo.addResource("branches");
        this.resourceV1RepoBranch = this.resourceV1RepoBranches.addResource("{branch_name}");
        this.resourceV1RepoBranchCreate = this.resourceV1RepoBranch.addResource("create");
        this.resourceV1RepoBranchCreateAck = this.resourceV1RepoBranchCreate.addResource("ack");
        this.resourceV1RepoBranchBuild = this.resourceV1RepoBranch.addResource("build");
        this.resourceV1RepoBranchBuildAck = this.resourceV1RepoBranchBuild.addResource("ack");
        this.resourceV1RepoBranchRemove = this.resourceV1RepoBranch.addResource("remove");
        this.resourceV1RepoBranchRemoveAck = this.resourceV1RepoBranchRemove.addResource("ack");

        const integrationOfAcknowledgeCreate = new apiGateway.LambdaIntegration(lambda.functionAcknowledgeCreate);
        new apiGateway.Method(scope, "Api/Stacks-V1-Repo-Branch-Create-Ack", {
            resource: this.resourceV1RepoBranchCreateAck,
            httpMethod: "POST",
            integration: integrationOfAcknowledgeCreate,
            options: {
                apiKeyRequired: true
            }
        });

        const integrationOfAcknowledgeBuild = new apiGateway.LambdaIntegration(lambda.functionAcknowledgeBuild);
        new apiGateway.Method(scope, "Api/Stacks-V1-Repo-Branch-Build-Ack", {
            resource: this.resourceV1RepoBranchBuildAck,
            httpMethod: "POST",
            integration: integrationOfAcknowledgeBuild,
            options: {
                apiKeyRequired: true
            }
        });

        const integrationOfAcknowledgeRemove = new apiGateway.LambdaIntegration(lambda.functionAcknowledgeRemove);
        new apiGateway.Method(scope, "Api/Stacks-V1-Repo-Branch-Remove-Ack", {
            resource: this.resourceV1RepoBranchRemoveAck,
            httpMethod: "POST",
            integration: integrationOfAcknowledgeRemove,
            options: {
                apiKeyRequired: true
            }
        });
    }
}