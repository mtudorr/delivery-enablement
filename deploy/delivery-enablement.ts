#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DeliveryEnablementStack } from './delivery-enablement-stack';
import { WebhooksStack } from './webhooks/webhooks-stack';

const app = new cdk.App();

new DeliveryEnablementStack(app, "DeliveryEnablementStack");
new WebhooksStack(app, "WebhooksStack");