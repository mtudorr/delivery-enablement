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

    public override acknowledgeCreate(): void {
        this.transitionTo(StackStateEnum.READY);
    }

    public override acknowledgeCreateFailed(): void {
        this.transitionTo(StackStateEnum.FAILED);
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
        this.transitionTo(StackStateEnum.PENDING_REMOVE);
    }

    public override acknowledgeRemoveFailed(): void {
        this.ignore();
    }
    public override acknowledgeRemoveIgnored(): void {
        this.ignore();
    }
}