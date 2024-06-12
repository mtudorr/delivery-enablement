import { AbstractAcknowledgeOutcomeHandler } from "./abstract-acknowledge_outcome_handler";
import { Stack } from "../domain/stack";

export class RemoveSuccessOutcomeHandler extends AbstractAcknowledgeOutcomeHandler {
    public handle(action: string, outcome: string, stack: Stack): void {
        if (action === "remove" && outcome === "success") {
            stack.acknowledgeRemove();
        } else {
            super.handle(action, outcome, stack);
        }
    }
}