import { StackState } from "./stack-state";
import { StackStateEnum } from "./stack-state-enum";

export class StackStatePendingRemove extends StackState {
    public constructor() {
        super(StackStateEnum.PENDING_REMOVE);
    }

    public create(): void {
        this.transitionTo(StackStateEnum.PENDING_RECREATE);
    }

    public build(): void {
        this.transitionTo(StackStateEnum.PENDING_RECREATE);
    }

    public remove(): void {
        this.selfTransition();
    }
}
