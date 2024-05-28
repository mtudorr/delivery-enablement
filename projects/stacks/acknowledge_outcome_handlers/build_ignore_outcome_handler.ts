import { AbstractAcknowledgeOutcomeHandler } from "../acknowledge_outcome_handler";
import { Stack } from "../domain/stack";

export class BuildIgnoreOutcomeHandler extends AbstractAcknowledgeOutcomeHandler {
    public handle(action: string, outcome: string, stack: Stack): void {
        if (action === "build" && outcome === "success") {
            console.log("BuildIgnoreOutcomeHandler: Build request ignored.");
            stack.acknowledgeBuildIgnored();
        } else {
            console.log("BuildIgnoreOutcomeHandler: Passing request to next handler.");
            super.handle(action, outcome, stack);
        }
    }
}