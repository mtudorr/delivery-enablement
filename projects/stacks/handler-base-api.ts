import { APIGatewayProxyResult } from "aws-lambda";
import { OnConflictRetry } from "./platform/on-conflict-retry";
import { ErrorConflict } from "./platform/error-conflict";

export const handlerBaseApi = async (fn: () => Promise<APIGatewayProxyResult>): Promise<APIGatewayProxyResult> => {
    try {
        return await new OnConflictRetry<APIGatewayProxyResult>(fn).execute();
    }
    catch (e: unknown) {
        if (e instanceof ErrorConflict) {
            return { statusCode: 409, body: "" };
        }

        throw e;
    }
}
