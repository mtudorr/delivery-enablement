# syntax=docker/dockerfile:1

FROM node:20-alpine
ADD src delivery-enablement
RUN apk update && apk add bash && apk add wget && apk add aws-cli
RUN cd /delivery-enablement/cdk && npm ci && cd ../../
CMD ls -la && /delivery-enablement/scripts/entry.build.sh