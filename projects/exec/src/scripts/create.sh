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

export ACTION_OUTCOME=success