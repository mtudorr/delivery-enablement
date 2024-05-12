#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DeliveryEnablementStack } from './delivery-enablement-stack';
import { WebhooksStack } from './projects/webhooks/webhooks-stack';
import { StacksStack } from './projects/stacks/stacks-stack';

const app = new cdk.App();

new DeliveryEnablementStack(app, "DeliveryEnablementStack");
new WebhooksStack(app, "WebhooksStack");
new StacksStack(app, "StacksStack");