import { APIGatewayProxyHandler, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { handlerBase } from "./handler-base";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    return await handlerBase(async () => {
        console.log(event);
    
        return {
            statusCode: 200,
            body: ""
        }
    });
}
