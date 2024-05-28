import { AbstractAcknowledgeOutcomeHandler } from "../acknowledge_outcome_handler";
import { Stack } from "../domain/stack";

export class CreateIgnoreOutcomeHandler extends AbstractAcknowledgeOutcomeHandler {
    public handle(action: string, outcome: string, stack: Stack): void {
        if (action === "create" && outcome === "ignore") {
            console.log("CreateIgnoreOutcomeHandler: Ignoring Request.");
            stack.acknowledgeCreateIgnored();
        } else {
            console.log("CreateIgnoreOutcomeHandler: Passing request to next handler.");
            super.handle(action, outcome, stack);
        }
    }
}