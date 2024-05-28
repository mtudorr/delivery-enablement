import { AbstractAcknowledgeOutcomeHandler } from "../acknowledge_outcome_handler";
import { Stack } from "../domain/stack";

export class RemoveIgnoreOutcomeHandler extends AbstractAcknowledgeOutcomeHandler {
    public handle(action: string, outcome: string, stack: Stack): void {
        if (action === "remove" && outcome === "ignore") {
            console.log("RemoveIgnoreOutcomeHandler: Remove request failed.");
            stack.acknowledgeRemoveIgnored();
        } else {
            console.log("RemoveIgnoreOutcomeHandler: Passing request to next handler.");
            super.handle(action, outcome, stack);
        }
    }
}