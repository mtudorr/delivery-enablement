import * as crypto from "crypto";
import { APIGatewayProxyHandler, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { isPayloadPush, hasChanges } from "./payload-push";
import { extractRepoAndBranchNames } from "./github-utils";
import { isPayloadOpen } from "./payload-open";
import { isPayloadClose } from "./payload-close"
import { Environment } from "./platform/environment";
import { Secrets } from "./platform/secrets";
import { Stacks } from "./platform/stacks";

const environment = new Environment();
const secrets = new Secrets();
const stacks = new Stacks(environment, secrets);

const isAuthorized = async (event: APIGatewayEvent): Promise<boolean> => {
    const key = await secrets.retrieveString(environment.get("SECRET_NAME_GITHUB_KEY"));

    const signature = crypto.createHmac("sha256", key)
        .update(event.body ?? "")
        .digest("hex");
    const trusted = Buffer.from(`sha256=${signature}`, 'ascii');
    const receive = Buffer.from(event.headers["X-Hub-Signature-256"] ?? "", 'ascii');

    if (trusted.length !== receive.length) {
        return false;
    }

    return crypto.timingSafeEqual(trusted, receive);
}

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    console.log(event);

    const isUnauthorized = !await isAuthorized(event);
    if (isUnauthorized) {
        return {
            statusCode: 403,
            body: "Invalid signature"
        };
    }

    if (event.body === null) {
        return {
            statusCode: 400,
            body: "Body not set"
        };
    }

    const body = JSON.parse(event.body);
    const { repo, branch } = extractRepoAndBranchNames(body) ?? { repo: '', branch: '' };

    if (isPayloadPush(body) && hasChanges(body)) {
        console.log("Initiate build");

        await stacks.build(repo, branch);
    } else {
        console.log("Not a push event payload");
    }

    if (isPayloadOpen(body)) {
        console.log("Initiate create branch")

        // await stacks.create(repo, branch);
    }

    if (isPayloadClose(body)) {
        console.log("Initiate close branch")

        // await stacks.remove(repo, branch);
    }

    console.log("AUTHORIZED");

    return {
        statusCode: 200,
        body: ""
    };
}