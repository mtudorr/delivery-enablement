import { StackState } from "./stack-state";
import { StackStateEnum } from "./stack-state-enum";

export class StackStatePendingCreate extends StackState {
    public constructor() {
        super(StackStateEnum.PENDING_CREATE);
    }

    public create(): void {
        this.selfTransition();
    }

    public build(): void {
        this.selfTransition();
    }

    public remove(): void {
        this.transitionTo(StackStateEnum.REMOVING);
    }

    public override acknowledgeCreate(): void {
        this.transitionTo(StackStateEnum.READY);
    }

    public override acknowledgeCreateFailed(): void {
        this.transitionTo(StackStateEnum.READY);
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
        this.transitionTo(StackStateEnum.CREATING);
    }

    public override acknowledgeRemoveFailed(): void {
        this.ignore();
    }
    public override acknowledgeRemoveIgnored(): void {
        this.ignore();
    }
}
