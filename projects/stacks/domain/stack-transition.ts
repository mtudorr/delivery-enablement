import { StackStateEnum } from "./stack-state-enum";

export class StackTransition {
    public readonly state: StackStateEnum;

    public constructor(state: StackStateEnum) {
        this.state = state;
    }
}
