import { StackState } from "./stack-state";
import { StackStateEnum } from "./stack-state-enum";

export class StackStateRemoving extends StackState {

    public constructor() {
        super(StackStateEnum.REMOVING);
    }

    public create(): void {
        this.transitionTo(StackStateEnum.PENDING_CREATE);
    }

    public build(): void {
        this.transitionTo(StackStateEnum.PENDING_CREATE);
    }

    public remove(): void {
        this.selfTransition();
    }

    public override acknowledgeCreate(): void {
        this.ignore();
    }

    public override acknowledgeCreateFailed(): void {
        throw new Error("Method not implemented.");
    }
    public override acknowledgeCreateIgnored(): void {
        throw new Error("Method not implemented.");
    }

    public override acknowledgeBuild(): void {
        this.ignore();
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
