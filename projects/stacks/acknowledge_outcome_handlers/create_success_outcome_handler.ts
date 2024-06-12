import { AbstractAcknowledgeOutcomeHandler } from "./abstract-acknowledge_outcome_handler";
import { Stack } from "../domain/stack";

export class CreateSuccessOutcomeHandler extends AbstractAcknowledgeOutcomeHandler {
    public handle(action: string, outcome: string, stack: Stack): void {
        if (action === "create" && outcome === "success") {
            stack.acknowledgeCreate();
        } else {
            super.handle(action, outcome, stack);
        }
    }
}