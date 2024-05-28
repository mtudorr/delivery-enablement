import { AbstractAcknowledgeOutcomeHandler } from "../acknowledge_outcome_handler";
import { Stack } from "../domain/stack";

export class BuildSuccessOutcomeHandler extends AbstractAcknowledgeOutcomeHandler {
    public handle(action: string, outcome: string, stack: Stack): void {
        if (action === "build" && outcome === "success") {
            console.log("BuildSuccessOutcomeHandler: Handling request.");
            stack.acknowledgeBuild();
        } else {
            console.log("BuildSuccessOutcomeHandler: Passing request to next handler.");
            super.handle(action, outcome, stack);
        }
    }
}