#!/bin/bash

/delivery-enablement/scripts/config_download.sh
if [[ $? -ne 0 ]]; then
    echo "Could not download configuration"
    exit -1
fi
echo "INFO: Downloaded config"

cd /delivery-enablement/cdk

/delivery-enablement/scripts/cdk_deploy.sh
retCdkDeploy=$?

if [[ $retCdkDeploy -eq 1 ]]; then
    echo "Operation ignored"
    exit 1
fi

if [[ $retCdkDeploy -ne 0 ]]; then
    echo "Could not deploy pipeline"
    exit -2
fi
echo "INFO: Pipeline deployed"

. /delivery-enablement/cdk.output.env.sh
if [[ $? -ne 0 ]]; then
    echo "Could not load stack output to env variables"
    exit -3
fi
echo "INFO: Read env variables"
