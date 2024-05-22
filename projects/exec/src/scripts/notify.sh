#!/bin/bash

aws sns publish --topic-arn $SNS_NOTIFICATIONS_ARN --message "{\"repo\": \"$REPO\", \"branch\": \"$BRANCH\", \"action\": \"$ACTION\", \"outcome\": \"$ACTION_OUTCOME\"}"
echo "INFO: Outcome published $ACTION $ACTION_OUTCOME"