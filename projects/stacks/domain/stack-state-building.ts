import { StackState } from "./stack-state";
import { StackStateEnum } from "./stack-state-enum";

export class StackStateBuilding extends StackState {
    public constructor() {
        super(StackStateEnum.BUILDING);
    }

    public create(): void {
        this.ignore();
    }

    public build(): void {
        this.transitionTo(StackStateEnum.PENDING_BUILD);
    }

    public remove(): void {
        this.transitionTo(StackStateEnum.PENDING_REMOVE);
    }
}