# syntax=docker/dockerfile:1

FROM node:20-alpine
ENV REPO=snd-documents-search
ENV BRANCH=develop
ENV GITHUB_OAUTH_TOKEN=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
ENV AWS_ACCESS_KEY_ID=AKIA3OXPIEGIVHRGW4U4
ENV AWS_SECRET_ACCESS_KEY=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
ENV AWS_REGION=eu-central-1
ADD src delivery-enablement
RUN apk update && apk add bash && apk add wget && apk add aws-cli
RUN cd /delivery-enablement/cdk && npm ci && cd ../../
CMD /delivery-enablement/scripts/create.sh