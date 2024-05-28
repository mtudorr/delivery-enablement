import { AbstractAcknowledgeOutcomeHandler } from "../acknowledge_outcome_handler";
import { Stack } from "../domain/stack";

export class CreateFailOutcomeHandler extends AbstractAcknowledgeOutcomeHandler {
    public handle(action: string, outcome: string, stack: Stack): void {
        if (action === "create" && outcome === "fail") {
            console.log("CreateFailOutcomeHandler: Create Failed.");
            stack.acknowledgeCreateFailed();
        } else {
            console.log("CreateFailOutcomeHandler: Passing request to next handler.");
            super.handle(action, outcome, stack);
        }
    }
}