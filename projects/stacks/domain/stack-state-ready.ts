import { StackState } from "./stack-state";
import { StackStateEnum } from "./stack-state-enum";

export class StackStateReady extends StackState {
    public constructor() {
        super(StackStateEnum.READY);
    }

    public override create(): void {
        this.ignore();
    }

    public override build(): void {
        this.transitionTo(StackStateEnum.BUILDING);
    }

    public override remove(): void {
        this.transitionTo(StackStateEnum.REMOVING);
    }
}
