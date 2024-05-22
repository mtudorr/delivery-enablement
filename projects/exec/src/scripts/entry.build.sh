#!/bin/bash

export ACTION=build
export ACTION_OUTCOME=fail

. /delivery-enablement/scripts/build.sh

/delivery-enablement/scripts/notify.sh