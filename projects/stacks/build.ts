import { APIGatewayProxyHandler, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { handlerBase } from "./handler-base";
import { Environment } from "./platform/environment";
import { StackPersistence } from "./persistence/stack-peristence";
import { IdOfStack } from "./domain/id-of-stack";
import { StackStateEnum } from "./domain/stack-state-enum";

const environment = new Environment();
const stackPersistence = new StackPersistence(environment);

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    return await handlerBase(async (): Promise<APIGatewayProxyResult> => {
        const valueOfRepoName = event.pathParameters?.repo_name;
        if (valueOfRepoName === undefined) {
            return { statusCode: 400, body: `repo_name: value not provided` };
        }

        const valueOfBranchName = event.pathParameters?.branch_name;
        if (valueOfBranchName === undefined) {
            return { statusCode: 400, body: `branch_name: value not provided` };
        }

        const idOfStack = new IdOfStack(valueOfRepoName, valueOfBranchName);
        const stack = await stackPersistence.retrieveOrNull(idOfStack);
        if (stack === null) {
            return { statusCode: 404, body: "" };
        }

        await stackPersistence
            .save({ ...stack, state: StackStateEnum.BUILDING });
    
        return { statusCode: 200, body: "" }
    });
}
