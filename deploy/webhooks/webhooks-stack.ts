import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiGateway } from './api-gateway';
import { Lambda } from './lambda';
import { Secrets } from './secrets';

export class WebhooksStack extends cdk.Stack {
    public constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const secrets = new Secrets(this);
        const lambda = new Lambda(this, secrets);
        const apiGateway = new ApiGateway(this, lambda);
    }
}