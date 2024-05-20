import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { readFileSync } from "fs";
import { schemaDefinitionConfiguration } from './definition-configuration';
import { PipelineStack } from './pipeline-stack';
import { IdOfSource } from './id-of-source';
import { Config } from './config';
import { AwsContext } from './aws-context';

const app = new cdk.App();

const repo = app.node.tryGetContext("repo");
if (repo === undefined || repo.length === 0) {
    throw new Error("Repo not specified");
}

const branch = app.node.tryGetContext("branch");
if (branch === undefined || branch.length === 0) {
    throw new Error("Branch not specified");
}

const configFileName = app.node.tryGetContext("config");
if (branch === undefined || branch.length === 0) {
    throw new Error("Config not specified");
}

const environmentLabel = app.node.tryGetContext("envLabel");
const idOfSource = new IdOfSource(repo, branch);

const configFileContent = readFileSync(configFileName, { encoding: "utf8" });
const config = new Config(idOfSource,
    schemaDefinitionConfiguration.parse(JSON.parse(configFileContent)), environmentLabel);

AwsContext.acquire().then(aws => {
    if (config.targetAwsAccountId !== aws.accountId) {
        console.log("Different AWS Account targeted");
        process.exit(1);
    }
    
    new PipelineStack(app, `DE-Stack-${config.targetEnvironmentLabel}`, {
        env: {
            account: config.targetAwsAccountId,
            region: config.targetAwsRegion
        }
    }, idOfSource, config.all.pipeline, config.targetEnvironment, config.targetEnvironmentLabel);
})
.catch(e => {
    console.error(e);
    process.exit(-1);
});
