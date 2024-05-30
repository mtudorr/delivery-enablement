import { AbstractAcknowledgeOutcomeHandler } from "./abstract-acknowledge_outcome_handler";
import { Stack } from "../domain/stack";

export class RemoveFailOutcomeHandler extends AbstractAcknowledgeOutcomeHandler {
    public handle(action: string, outcome: string, stack: Stack): void {
        if (action === "remove" && outcome === "success") {
            console.log("RemoveFailOutcomeHandler: Remove request failed.");
            stack.acknowledgeRemoveFailed();
        } else {
            console.log("RemoveFailOutcomeHandler: Passing request to next handler.");
            super.handle(action, outcome, stack);
        }
    }
}