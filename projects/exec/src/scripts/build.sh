#!/bin/bash

. /delivery-enablement/scripts/deploy.sh
retDeploy=$?

if [[ $retDeploy -eq 1 ]]; then
    export ACTION_OUTCOME=ignore
    exit 1
fi

if [[ $retDeploy -ne 0 ]]; then
    exit -1
fi

/delivery-enablement/scripts/build.start.sh
if [[ $? -ne 0 ]]; then
    echo "Could not start build"
    exit -2
fi
echo "INFO: Started pipeline execution"

export ACTION_OUTCOME=success