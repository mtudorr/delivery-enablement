#!/bin/bash

export ACTION=create
export ACTION_OUTCOME=fail

. /delivery-enablement/scripts/create.sh

/delivery-enablement/scripts/notify.sh