#!/bin/bash

npm ci
if [[ $? -ne 0 ]]; then
    echo "Could not install node modules"
    exit -1
fi

npx cdk synth --context repo=$REPO --context branch=$BRANCH --context config=/delivery-enablement/de.config.json --json > /delivery-enablement/cdk.synth.json
retCdkDeploy = $?

if [[ $retCdkDeploy -eq 1 ]]; then
    echo "Pipeline synth ignored"
    exit 1
fi

if [[ $retCdkDeploy -ne 0 ]]; then
    echo "Pipeline synth failed"
    exit -2
fi

node /delivery-enablement/scripts/cdk_synth_env.js
if [[ $? -ne 0 ]]; then
    echo "Could not synth to env variables"
    exit -1
fi
