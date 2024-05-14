import { StackState } from "./stack-state";
import { StackStateEnum } from "./stack-state-enum";

export class StackStateCreating extends StackState {
    public constructor() {
        super(StackStateEnum.CREATING);
    }

    public override create(): void {
        this.selfTransition();
    }

    public override build(): void {
        this.transitionTo(StackStateEnum.PENDING_BUILD);
    }

    public override remove(): void {
        this.transitionTo(StackStateEnum.PENDING_REMOVE);
    }
}