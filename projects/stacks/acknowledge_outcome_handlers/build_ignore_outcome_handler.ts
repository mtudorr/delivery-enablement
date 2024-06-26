import { AbstractAcknowledgeOutcomeHandler } from "./abstract-acknowledge_outcome_handler";
import { Stack } from "../domain/stack";

export class BuildIgnoreOutcomeHandler extends AbstractAcknowledgeOutcomeHandler {
    public handle(action: string, outcome: string, stack: Stack): void {
        if (action === "build" && outcome === "ignore") {
            stack.acknowledgeBuildIgnored();
        } else {
            super.handle(action, outcome, stack);
        }
    }
}