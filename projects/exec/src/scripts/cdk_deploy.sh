#!/bin/bash

echo "INFO: Starting deploying pipeline"

npx cdk deploy --context repo=$REPO --context branch=$BRANCH --context config=/delivery-enablement/de.config.json --context envLabel=$ENV_LABEL --outputs-file /delivery-enablement/cdk.output.json --require-approval never
retCdkDeploy=$?

if [[ $retCdkDeploy -eq 100 ]]; then
    echo "Pipeline deployment ignored"
    exit 1
fi

if [[ $retCdkDeploy -ne 0 ]]; then
    echo "Pipeline deployment failed"
    exit -2
fi

node /delivery-enablement/scripts/cdk_deploy_env.js
if [[ $? -ne 0 ]]; then
    echo "Could not prepare script to load stack outputs in env variables"
    exit -1
fi
