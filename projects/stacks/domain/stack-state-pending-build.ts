import { StackState } from "./stack-state";
import { StackStateEnum } from "./stack-state-enum";

export class StackStatePendingBuild extends StackState {
    public constructor() {
        super(StackStateEnum.PENDING_BUILD);
    }

    public create(): void {
        this.ignore();
    }

    public build(): void {
        this.selfTransition();
    }

    public remove(): void {
        this.transitionTo(StackStateEnum.PENDING_REMOVE);
    }
}