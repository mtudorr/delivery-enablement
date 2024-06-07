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

    public override acknowledgeCreate(): void {
        this.selfTransition();
    }

    public override acknowledgeCreateFailed(): void {
        this.ignore();
    }
    public override acknowledgeCreateIgnored(): void {
        this.ignore();
    }

    public override acknowledgeBuild(): void {
        this.transitionTo(StackStateEnum.BUILT);
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
