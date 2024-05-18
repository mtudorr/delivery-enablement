#!/bin/bash

npm ci
if [[ $? -ne 0 ]]; then
    echo "Could not install node modules"
    exit -1
fi

npx cdk deploy --context repo=$REPO --context branch=$BRANCH --context config=/delivery-enablement/de.config.json --require-approval never
retCdkDeploy = $?

if [[ $retCdkDeploy -eq 1 ]]; then
    echo "Pipeline deployment ignored"
    exit 1
fi

if [[ $retCdkDeploy -ne 0 ]]; then
    echo "Pipeline deployment failed"
    exit -2
fi