import { APIGatewayProxyResult } from "aws-lambda";
import { OnConflictRetry } from "./platform/on-conflict-retry";
import { ErrorConflict } from "./platform/error-conflict";
import { Environment } from "./platform/environment";
import { Secrets } from "./platform/secrets";
import { Logging } from "./platform/logging";

const environment = new Environment();
const secrets = new Secrets();

export const handlerBaseApi = async (fn: () => Promise<APIGatewayProxyResult>): Promise<APIGatewayProxyResult> => {
    try {
        return await new OnConflictRetry<APIGatewayProxyResult>(fn).execute();
    }
    catch (e: unknown) {
        if (e instanceof ErrorConflict) {
            return { statusCode: 409, body: "" };
        }

        const logging = await Logging.obtain(environment, secrets);
        await logging.error(e);

        throw e;
    }
}
