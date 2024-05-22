import { SNSEvent, SNSHandler } from "aws-lambda";
import { ExecOutcomeNotification } from "./platform/exec-outcome-notification";
import { StackPersistence } from "./persistence/stack-peristence";
import { Environment } from "./platform/environment";
import { IdOfStack } from "./domain/id-of-stack";
import { Stack } from "./domain/stack";
import { ExecDispatch } from "./platform/exec-dispatch";

const environment = new Environment();
const stackPersistence = new StackPersistence(environment);
const execDispatch = new ExecDispatch(environment);

export const handler: SNSHandler = async (event: SNSEvent): Promise<void> => {
    if (event.Records.length === 0) {
        console.log("Ignored, 'Records' empty", event);
        return;
    }

    const outcomeNotification: ExecOutcomeNotification = JSON.parse(event.Records[0].Sns.Message);

    const idOfStack = new IdOfStack(outcomeNotification.repo, outcomeNotification.branch);
    const recordOfStack = await stackPersistence.retrieveOrNull(idOfStack);
    if (recordOfStack === null) {
        console.log("Ignored, stack not found", event);
        return;
    }
    
    const stateBefore = recordOfStack?.state ?? null;

    const stack = new Stack(idOfStack, recordOfStack.state, recordOfStack.environmentLabel, recordOfStack.version);
    // TODO: User chain of responsibility to call the correct trigger based on the outcome
    stack.acknowledgeCreate();

    await execDispatch.for(idOfStack.repo, idOfStack.branch, stack.environmentLabel, stateBefore, stack.state);
    await stackPersistence
        .save({ repo: stack.id.repo, branch: stack.id.branch, 
            state: stack.state, environmentLabel: stack.environmentLabel, version: stack.version });
}
