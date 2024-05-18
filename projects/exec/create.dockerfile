# syntax=docker/dockerfile:1

FROM node:20-alpine
ADD src delivery-enablement
RUN apk update && apk add bash && apk add wget && apk add aws-cli
CMD /delivery-enablement/scripts/create.sh