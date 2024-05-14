import { StackState } from "./stack-state";
import { StackStateEnum } from "./stack-state-enum";

export class StackStatePendingRecreate extends StackState {
    public constructor() {
        super(StackStateEnum.PENDING_RECREATE);
    }

    public create(): void {
        this.selfTransition();
    }

    public build(): void {
        this.selfTransition();
    }

    public remove(): void {
        this.transitionTo(StackStateEnum.PENDING_REMOVE);
    }
}
