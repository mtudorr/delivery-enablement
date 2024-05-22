import { APIGatewayProxyHandler, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { handlerBaseApi } from "./handler-base-api";
import { Environment } from "./platform/environment";
import { StackPersistence } from "./persistence/stack-peristence";
import { IdOfStack } from "./domain/id-of-stack";
import { StackStateEnum } from "./domain/stack-state-enum";
import { Version } from "./persistence/version";
import { Stack } from "./domain/stack";
import { ExecDispatch } from "./platform/exec-dispatch";

const environment = new Environment();
const stackPersistence = new StackPersistence(environment);
const execDispatch = new ExecDispatch(environment);

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

        const environmentLabel = event.queryStringParameters !== null ? event.queryStringParameters["env"] ?? null : null;

        const idOfStack = new IdOfStack(valueOfRepoName, valueOfBranchName);
        const recordOfStack = await stackPersistence.retrieveOrNull(idOfStack);
        const stateBefore = recordOfStack?.state ?? null;

        const stack = recordOfStack 
            ? new Stack(idOfStack, recordOfStack.state, recordOfStack.environmentLabel, recordOfStack.version)
            : new Stack(idOfStack, StackStateEnum.CREATING, environmentLabel, Version.none());
        if (stack.environmentLabel !== environmentLabel) {
            return { statusCode: 400, body: `env: must be ${environmentLabel} for ${idOfStack.repo}/${idOfStack.branch}` };
        }
        stack.create();
        
        await execDispatch.for(idOfStack.repo, idOfStack.branch, stack.environmentLabel, stateBefore, stack.state);
        await stackPersistence
            .save({ repo: stack.id.repo, branch: stack.id.branch, 
                state: stack.state, environmentLabel: stack.environmentLabel, version: stack.version });
    
        return { statusCode: 200, body: "" }
    });
}
