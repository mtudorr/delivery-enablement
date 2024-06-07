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

    public override acknowledgeCreate(): void {
        this.ignore();
    }

    public override acknowledgeCreateFailed(): void {
        this.transitionTo(StackStateEnum.FAILED);
    }
    public override acknowledgeCreateIgnored(): void {
        this.ignore();
    }

    public override acknowledgeBuild(): void {
        this.transitionTo(StackStateEnum.BUILT);
    }

    public override acknowledgeBuildFailed(): void {
        this.transitionTo(StackStateEnum.FAILED);
    }
    public override acknowledgeBuildIgnored(): void {
        this.ignore();
    }

    public override acknowledgeRemove(): void {
        this.transitionTo(StackStateEnum.REMOVED);
    }

    public override acknowledgeRemoveFailed(): void {
        this.ignore();
    }
    public override acknowledgeRemoveIgnored(): void {
        this.ignore();
    }
}