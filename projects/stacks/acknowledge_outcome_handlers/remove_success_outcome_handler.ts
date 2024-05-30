import { AbstractAcknowledgeOutcomeHandler } from "./abstract-acknowledge_outcome_handler";
import { Stack } from "../domain/stack";

export class RemoveSuccessOutcomeHandler extends AbstractAcknowledgeOutcomeHandler {
    public handle(action: string, outcome: string, stack: Stack): void {
        if (action === "remove" && outcome === "success") {
            console.log("RemoveSuccessOutcomeHandler: Remove request succeeded.");
            stack.acknowledgeRemove();
        } else {
            console.log("RemoveSuccessOutcomeHandler: Passing request to next handler.");
            super.handle(action, outcome, stack);
        }
    }
}