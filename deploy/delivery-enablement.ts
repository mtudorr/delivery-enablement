#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DeliveryEnablementStack } from './delivery-enablement-stack';
import { WebhooksStack } from './projects/webhooks/webhooks-stack';
import { StacksStack } from './projects/stacks/stacks-stack';
import { ExecStack } from './projects/exec/exec-stack';
import { Config } from './config';

const app = new cdk.App();
const config = new Config();

const execStack = new ExecStack(app, "ExecStack", config, {
    env: {
        account: config.awsAccountId,
        region: config.awsRegion
    }
});

new DeliveryEnablementStack(app, "DeliveryEnablementStack");
new WebhooksStack(app, "WebhooksStack");
new StacksStack(app, "StacksStack", execStack).addDependency(execStack);