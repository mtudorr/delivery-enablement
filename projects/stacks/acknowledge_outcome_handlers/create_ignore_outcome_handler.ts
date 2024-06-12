import { AbstractAcknowledgeOutcomeHandler } from "./abstract-acknowledge_outcome_handler";
import { Stack } from "../domain/stack";

export class CreateIgnoreOutcomeHandler extends AbstractAcknowledgeOutcomeHandler {
    public handle(action: string, outcome: string, stack: Stack): void {
        if (action === "create" && outcome === "ignore") {
            stack.acknowledgeCreateIgnored();
        } else {
            super.handle(action, outcome, stack);
        }
    }
}