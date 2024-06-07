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
        this.transitionTo(StackStateEnum.REMOVED);
    }

    public override acknowledgeRemoveFailed(): void {
        this.ignore();
    }
    public override acknowledgeRemoveIgnored(): void {
        this.ignore();
    }
}
