import { APIGatewayProxyHandler, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { handlerBaseApi } from "./handler-base-api";
import { Environment } from "./platform/environment";
import { StackPersistence } from "./persistence/stack-peristence";
import { IdOfStack } from "./domain/id-of-stack";
import { Stack } from "./domain/stack";

const environment = new Environment();
const stackPersistence = new StackPersistence(environment);

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    return await handlerBaseApi(async (): Promise<APIGatewayProxyResult> => {
        const valueOfRepoName = event.pathParameters?.repo_name;
        if (valueOfRepoName === undefined) {
            return { statusCode: 400, body: `repo_name: value not provided` };
        }

        const valueOfBranchName = event.pathParameters?.branch_name;
        if (valueOfBranchName === undefined) {
            return { statusCode: 400, body: `branch_name: value not provided` };
        }

        const idOfStack = new IdOfStack(valueOfRepoName, valueOfBranchName);
        const recordOfStack = await stackPersistence.retrieveOrNull(idOfStack);
        if (recordOfStack === null) {
            return { statusCode: 404, body: "" };
        }
        
        const stack = new Stack(idOfStack, recordOfStack.state, recordOfStack.environmentLabel, recordOfStack.version);
        stack.remove();
        
        await stackPersistence
            .save({ repo: stack.id.repo, branch: stack.id.branch, 
                state: stack.state, environmentLabel: recordOfStack.environmentLabel, version: stack.version });
    
        return { statusCode: 200, body: "" }
    });
}
