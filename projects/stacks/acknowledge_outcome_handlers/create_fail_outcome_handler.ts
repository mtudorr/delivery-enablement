import { AbstractAcknowledgeOutcomeHandler } from "./abstract-acknowledge_outcome_handler";
import { Stack } from "../domain/stack";

export class CreateFailOutcomeHandler extends AbstractAcknowledgeOutcomeHandler {
    public handle(action: string, outcome: string, stack: Stack): void {
        if (action === "create" && outcome === "fail") {
            stack.acknowledgeCreateFailed();
        } else {
            super.handle(action, outcome, stack);
        }
    }
}