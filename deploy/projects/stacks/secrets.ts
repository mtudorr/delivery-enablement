import * as secretsManager from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";

export class Secrets {
    public readonly rollbarAccessToken: secretsManager.Secret;

    public constructor(scope: Construct) {        
        this.rollbarAccessToken = new secretsManager.Secret(scope, "Secrets/Rollbar-Access-Token", {
            secretName: "delivery-enablement-stacks-rollbar-access-token"
        });
    }
}