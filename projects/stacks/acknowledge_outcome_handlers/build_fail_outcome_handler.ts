import { AbstractAcknowledgeOutcomeHandler } from "../acknowledge_outcome_handler";
import { Stack } from "../domain/stack";

export class BuildFailOutcomeHandler extends AbstractAcknowledgeOutcomeHandler {
    public handle(action: string, outcome: string, stack: Stack): void {
        if (action === "build" && outcome === "fail") {
            console.log("BuildFailOutcomeHandler: Build request failed.");
            stack.acknowledgeBuildFailed();
        } else {
            console.log("BuildFailOutcomeHandler: Passing request to next handler.");
            super.handle(action, outcome, stack);
        }
    }
}