import { AbstractAcknowledgeOutcomeHandler } from "./abstract-acknowledge_outcome_handler";
import { Stack } from "../domain/stack";

export class RemoveIgnoreOutcomeHandler extends AbstractAcknowledgeOutcomeHandler {
    public handle(action: string, outcome: string, stack: Stack): void {
        if (action === "remove" && outcome === "ignore") {
            stack.acknowledgeRemoveIgnored();
        } else {
            super.handle(action, outcome, stack);
        }
    }
}