import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiGateway } from './api-gateway';
import { Lambda } from './lambda';
import { DynamoDb } from './dynamo-db';
import { ApiGatewayAck } from './api-gateway-ack';
import { ExecStack } from '../exec/exec-stack';

export class StacksStack extends cdk.Stack {
    public constructor(scope: Construct, id: string, execStack: ExecStack, props?: cdk.StackProps) {
        super(scope, id, props);

        const dynamoDb = new DynamoDb(this);
        const lambda = new Lambda(this, execStack, dynamoDb);

        new ApiGatewayAck(this, lambda);
        new ApiGateway(this, lambda);
    }
}
