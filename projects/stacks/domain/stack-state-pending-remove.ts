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
        throw new Error("Method not implemented.");
    }

    public override acknowledgeCreateFailed(): void {
        throw new Error("Method not implemented.");
    }
    public override acknowledgeCreateIgnored(): void {
        throw new Error("Method not implemented.");
    }

    public override acknowledgeBuild(): void {
        throw new Error("Method not implemented.");
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
