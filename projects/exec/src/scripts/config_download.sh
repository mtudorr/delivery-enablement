#!/bin/bash

wget https://api.github.com/repos/mtudorr/$REPO/contents/README.md?ref=$BRANCH --header="X-GitHub-Api-Version: 2022-11-28" --header="Authorization: Bearer $GITHUB_OAUTH_TOKEN" -O /delivery-enablement/config.out
if [[ $? -ne 0 ]]; then
    echo "Could not acquire configuration from GitHub"
    exit -1
fi

node /delivery-enablement/scripts/config_download_prepare.js
if [[ $? -ne 0 ]]; then
    echo "Could not prepare configuration"
    exit -1
fi