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
        throw new Error("Method not implemented.");
    }
    public override acknowledgeCreateIgnored(): void {
        throw new Error("Method not implemented.");
    }

    public override acknowledgeBuild(): void {
        this.transitionTo(StackStateEnum.BUILT);
    }

    public override acknowledgeBuildFailed(): void {
        throw new Error("Method not implemented.");
    }
    public override acknowledgeCreateBuildIgnored(): void {
        throw new Error("Method not implemented.");
    }

    public override acknowledgeRemove(): void {
        this.transitionTo(StackStateEnum.REMOVED);
    }

    public override acknowledgeRemoveFailed(): void {
        throw new Error("Method not implemented.");
    }
    public override acknowledgeRemoveIgnored(): void {
        throw new Error("Method not implemented.");
    }
}