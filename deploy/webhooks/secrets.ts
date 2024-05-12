import * as secretsManager from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";

export class Secrets {
    public readonly webhooksGitHubKey: secretsManager.Secret;

    public constructor(scope: Construct) {
        this.webhooksGitHubKey = new secretsManager.Secret(scope, "Secrets/Webhooks-GitHub-Key", {
            secretName: "delivery-enablement-webhooks-github-key"
        });
    }
}