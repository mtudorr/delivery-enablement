import * as crypto from "crypto";
import { APIGatewayProxyHandler, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { Payload, extractRepoAndBranchNames } from "./payload";
import { isPayloadPush, hasChanges } from "./payload-push";
import { isPayloadOpen } from "./payload-open";
import { isPayloadClose } from "./payload-close"
import { extractPullRequestTag } from "./pull-request";
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
        const body: Payload = JSON.parse(event.body);
        const { repo, branch } = extractRepoAndBranchNames(body) ?? { repo: '', branch: '' };
        if (repo.length === 0 || branch.length === 0) {
            throw new Error(`Invalid repo and branch, found [${repo}][${branch}]`);
        }

        await stacks.build(repo, branch);
    } else {
        console.log("Not a push event payload");
    }
        if (isPayloadPush(body) && hasChanges(body)) {
            console.log("Initiate build");

    if (isPayloadOpen(body)) {
        console.log("Initiate create branch")
            await stacks.build(repo, branch);
        } else {
            console.log("Not a push event payload");
        }

        // await stacks.create(repo, branch);
    }
        if (isPayloadOpen(body)) {
            console.log("Initiate create branch")
            
            const tagOfPullRequest = extractPullRequestTag(body);

    if (isPayloadClose(body)) {
        console.log("Initiate close branch")
            if(tagOfPullRequest !== null) {
                await stacks.create(repo, branch, tagOfPullRequest);
            }
            else {
                console.log("Could not create branch, pull request id couldn't be retrieved.");
            }
        }

        // await stacks.remove(repo, branch);
    }
        if (isPayloadClose(body)) {
            console.log("Initiate close branch")

    console.log("AUTHORIZED");
            await stacks.remove(repo, branch);
        }

    return {
        statusCode: 200,
        body: ""
    };
        console.log("AUTHORIZED");

        return {
            statusCode: 200,
            body: ""
        };
    }
}