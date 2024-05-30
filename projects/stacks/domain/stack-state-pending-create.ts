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
        this.transitionTo(StackStateEnum.REMOVED);
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
    public override acknowledgeBuildIgnored(): void {
        throw new Error("Method not implemented.");
    }

    public override acknowledgeRemove(): void {
        throw new Error("Method not implemented.");
    }

    public override acknowledgeRemoveFailed(): void {
        throw new Error("Method not implemented.");
    }
    public override acknowledgeRemoveIgnored(): void {
        throw new Error("Method not implemented.");
    }
}
