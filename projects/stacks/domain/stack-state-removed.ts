import { StackState } from "./stack-state";
import { StackStateEnum } from "./stack-state-enum";

export class StackStateRemoved extends StackState {
    public constructor() {
        super(StackStateEnum.REMOVED);
    }

    public create(): void {
        this.transitionTo(StackStateEnum.CREATING);
    }

    public build(): void {
        this.transitionTo(StackStateEnum.CREATING);
    }

    public remove(): void {
        this.ignore();
    }
}
