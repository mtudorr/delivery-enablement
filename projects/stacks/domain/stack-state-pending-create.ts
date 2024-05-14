import { StackState } from "./stack-state";
import { StackStateEnum } from "./stack-state-enum";

export class StackStatePendingCreate extends StackState {
    public constructor() {
        super(StackStateEnum.PENDING_CREATE);
    }

    public create(): void {
        this.selfTransition();
    }

    public build(): void {
        this.selfTransition();
    }

    public remove(): void {
        this.transitionTo(StackStateEnum.REMOVED);
    }
}
