import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiGateway } from './api-gateway';
import { Lambda } from './lambda';

export class WebhooksStack extends cdk.Stack {
    public constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const lambda = new Lambda(this);
        const apiGateway = new ApiGateway(this, lambda);
    }
}