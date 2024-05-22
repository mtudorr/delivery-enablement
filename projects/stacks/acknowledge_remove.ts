import { APIGatewayProxyHandler, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { handlerBaseApi } from "./handler-base-api";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    return await handlerBaseApi(async () => {
        console.log(event);
    
        return {
            statusCode: 200,
            body: ""
        }
    });
}
