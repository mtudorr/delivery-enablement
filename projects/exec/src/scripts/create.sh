#!/bin/bash

cd /

/delivery-enablement/scripts/config_download.sh
if [[ $? -ne 0 ]]; then
    echo "Could not download configuration"
    exit -1
fi

cd /delivery-enablement/cdk
/delivery-enablement/scripts/cdk_deploy.sh
retCdkDeploy = $?

if [[ $retCdkDeploy -eq 1 ]]; then
    echo "Operation ignored"
    exit 1
fi

if [[ $retCdkDeploy -ne 0 ]]; then
    echo "Could not deploy pipeline"
    exit -2
fi

/delivery-enablement/scripts/cdk_synth.sh
retCdkSynth = $?

if [[ $retCdkSynth -eq 1 ]]; then
    echo "Operation ignored"
    exit 1
fi

if [[ $retCdkSynth -ne 0 ]]; then
    echo "Could not synth pipeline"
    exit -2
fi

cd /

/delivery-enablement/scripts/build.start.sh
if [[ $? -ne 0 ]]; then
    echo "Could not start build"
    exit -1
fi