import * as crypto from "crypto";
import { APIGatewayProxyHandler, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const isAuthorized = async (event: APIGatewayEvent): Promise<boolean> => {
    const secretName = process.env.SECRET_NAME_GITHUB_KEY;
    if (secretName === undefined) {
        return false;
    }

    const client = new SecretsManagerClient();
    const input = {
        SecretId: secretName
    };
    
    const cmd = new GetSecretValueCommand(input);
    const res = await client.send(cmd);

    const key = res.SecretString;
    if (key === undefined) {
        return false;
    }

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

    console.log("AUTHORIZED");

    return {
        statusCode: 200,
        body: ""
    };
}
