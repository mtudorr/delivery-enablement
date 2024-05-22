#!/bin/bash

export ACTION=create
export ACTION_OUTCOME=fail

mkdir /delivery-enablement/tmp && export TMP=/delivery-enablement/tmp &&
cd /

/delivery-enablement/scripts/config_download.sh
echo "INFO: Downloaded config"
if [[ $? -ne 0 ]]; then
    echo "Could not download configuration"
    
    /delivery-enablement/scripts/notify.sh
    exit -1
fi

cd /delivery-enablement/cdk
/delivery-enablement/scripts/cdk_deploy.sh
retCdkDeploy=$?

if [[ $retCdkDeploy -eq 1 ]]; then
    echo "Operation ignored"
    
    export ACTION_OUTCOME=ignore
    /delivery-enablement/scripts/notify.sh
    exit 1
fi

if [[ $retCdkDeploy -ne 0 ]]; then
    echo "Could not deploy pipeline"

    /delivery-enablement/scripts/notify.sh
    exit -2
fi
echo "INFO: Pipeline deployed"

. /delivery-enablement/cdk.output.env.sh
echo "INFO: Read env variables"
if [[ $? -ne 0 ]]; then
    echo "Could not load stack output to env variables"

    /delivery-enablement/scripts/notify.sh
    exit -1
fi

cd /

/delivery-enablement/scripts/build.start.sh
echo "INFO: Started pipeline execution"
if [[ $? -ne 0 ]]; then
    echo "Could not start build"
    
    /delivery-enablement/scripts/notify.sh
    exit -1
fi

export ACTION_OUTCOME=success
/delivery-enablement/scripts/notify.sh