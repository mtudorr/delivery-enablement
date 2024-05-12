import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { Lambda } from "./lambda";

export class ApiGateway {
    public readonly restApi: apiGateway.RestApi;
    public readonly apiKey: apiGateway.ApiKey;

    public readonly resourceV1: apiGateway.Resource;
    public readonly resourceV1Repos: apiGateway.Resource;
    public readonly resourceV1Repo: apiGateway.Resource;
    public readonly resourceV1RepoBranches: apiGateway.Resource;
    public readonly resourceV1RepoBranch: apiGateway.Resource;
    public readonly resourceV1RepoBranchCreate: apiGateway.Resource;
    public readonly resourceV1RepoBranchBuild: apiGateway.Resource;
    public readonly resourceV1RepoBranchRemove: apiGateway.Resource;

    public constructor(scope: Construct, lambda: Lambda) {
        this.restApi = new apiGateway.RestApi(scope, "Api/Stacks", {
            restApiName: "delivery-enablement-stacks",
            deployOptions: {
                stageName: "main"
            }
        });

        this.apiKey = new apiGateway.ApiKey(scope, "Api/Stacks-Webhooks-Key", {
            apiKeyName: "delivery-enablement-stacks-webhooks"
        });

        const usagePlan = new apiGateway.UsagePlan(scope, "Api/Stacks-Webhooks-Plan", {
            name: "delivery-enablement-stacks-webhooks",
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
        this.resourceV1RepoBranchBuild = this.resourceV1RepoBranch.addResource("build");
        this.resourceV1RepoBranchRemove = this.resourceV1RepoBranch.addResource("remove");

        const integrationOfCreate = new apiGateway.LambdaIntegration(lambda.functionCreate);
        new apiGateway.Method(scope, "Api/Stacks-V1-Repo-Branch-Create", {
            resource: this.resourceV1RepoBranchCreate,
            httpMethod: "POST",
            integration: integrationOfCreate,
            options: {
                apiKeyRequired: true
            }
        });

        const integrationOfBuild = new apiGateway.LambdaIntegration(lambda.functionBuild);
        new apiGateway.Method(scope, "Api/Stacks-V1-Repo-Branch-Build", {
            resource: this.resourceV1RepoBranchBuild,
            httpMethod: "POST",
            integration: integrationOfBuild,
            options: {
                apiKeyRequired: true
            }
        });

        const integrationOfRemove = new apiGateway.LambdaIntegration(lambda.functionRemove);
        new apiGateway.Method(scope, "Api/Stacks-V1-Repo-Branch-Remove", {
            resource: this.resourceV1RepoBranchRemove,
            httpMethod: "POST",
            integration: integrationOfRemove,
            options: {
                apiKeyRequired: true
            }
        });
    }
}