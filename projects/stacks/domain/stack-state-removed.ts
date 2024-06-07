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

    public override acknowledgeCreate(): void {
        this.ignore();
    }

    public override acknowledgeCreateFailed(): void {
        this.ignore();
    }
    public override acknowledgeCreateIgnored(): void {
        this.ignore();
    }

    public override acknowledgeBuild(): void {
        this.ignore();
    }

    public override acknowledgeBuildFailed(): void {
        this.ignore();
    }
    public override acknowledgeBuildIgnored(): void {
        this.ignore();
    }

    public override acknowledgeRemove(): void {
        this.selfTransition();
    }

    public override acknowledgeRemoveFailed(): void {
        this.ignore();
    }
    public override acknowledgeRemoveIgnored(): void {
        this.ignore();
    }
}
