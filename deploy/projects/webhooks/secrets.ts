import * as secretsManager from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";

export class Secrets {
    public readonly webhooksGitHubKey: secretsManager.Secret;
    public readonly webhooksStacksKey: secretsManager.Secret;
    public readonly rollbarAccessToken: secretsManager.Secret;

    public constructor(scope: Construct) {
        this.webhooksGitHubKey = new secretsManager.Secret(scope, "Secrets/Webhooks-GitHub-Key", {
            secretName: "delivery-enablement-webhooks-github-key"
        });
        
        this.webhooksStacksKey = new secretsManager.Secret(scope, "Secrets/Webhooks-Stacks-Key", {
            secretName: "delivery-enablement-webhooks-stacks-key"
        });
        
        this.rollbarAccessToken = new secretsManager.Secret(scope, "Secrets/Rollbar-Access-Token", {
            secretName: "delivery-enablement-webhooks-rollbar-access-token"
        });
    }
}