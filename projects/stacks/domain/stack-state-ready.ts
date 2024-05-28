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
