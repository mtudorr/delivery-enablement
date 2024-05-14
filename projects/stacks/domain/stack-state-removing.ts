import { StackState } from "./stack-state";
import { StackStateEnum } from "./stack-state-enum";

export class StackStateRemoving extends StackState {
    public constructor() {
        super(StackStateEnum.REMOVING);
    }

    public create(): void {
        this.transitionTo(StackStateEnum.PENDING_CREATE);
    }

    public build(): void {
        this.transitionTo(StackStateEnum.PENDING_CREATE);
    }

    public remove(): void {
        this.selfTransition();
    }
}
