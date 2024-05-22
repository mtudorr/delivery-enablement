import { APIGatewayProxyHandler, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { handlerBase } from "./handler-base";
import { Environment } from "./platform/environment";
import { StackPersistence } from "./persistence/stack-peristence";
import { IdOfStack } from "./domain/id-of-stack";
import { StackStateEnum } from "./domain/stack-state-enum";
import { Version } from "./persistence/version";
import { Stack } from "./domain/stack";
import { Exec } from "./platform/exec";

const environment = new Environment();
const stackPersistence = new StackPersistence(environment);
const exec = new Exec(environment);

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

        // TODO: Perist environmentLabel in stack to use in follow-up operations
        const environmentLabel = event.queryStringParameters !== null ? event.queryStringParameters["env"] ?? null : null;

        const idOfStack = new IdOfStack(valueOfRepoName, valueOfBranchName);
        const recordOfStack = await stackPersistence.retrieveOrNull(idOfStack);
        if (recordOfStack === null) {
            await exec.create(valueOfRepoName, valueOfBranchName, environmentLabel);
            await stackPersistence.save({ repo: valueOfRepoName, branch: valueOfBranchName,
                state: StackStateEnum.CREATING, version: Version.none() });
        }
        else {
            const stack = new Stack(idOfStack, recordOfStack.state, recordOfStack.version);
            const stackStateBefore = stack.state;
            stack.create();

            if (stack.state === StackStateEnum.CREATING && stackStateBefore !== StackStateEnum.CREATING) {
                await exec.create(valueOfRepoName, valueOfBranchName, environmentLabel);
            }

            await stackPersistence
                .save({ repo: stack.id.repo, branch: stack.id.branch, state: stack.state, version: stack.version });
        }
    
        return { statusCode: 200, body: "" }
    });
}
