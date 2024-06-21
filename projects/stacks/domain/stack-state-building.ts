import { StackState } from "./stack-state";
import { StackStateEnum } from "./stack-state-enum";

export class StackStateBuilding extends StackState {
    public constructor() {
        super(StackStateEnum.BUILDING);
    }

    public create(): void {
        this.transitionTo(StackStateEnum.PENDING_CREATE);
    }

    public build(): void {
        this.transitionTo(StackStateEnum.PENDING_BUILD);
    }

    public remove(): void {
        this.transitionTo(StackStateEnum.PENDING_REMOVE);
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
        this.transitionTo(StackStateEnum.READY);
    }

    public override acknowledgeBuildFailed(): void {
        this.transitionTo(StackStateEnum.READY);
    }
    public override acknowledgeBuildIgnored(): void {
        this.ignore();
    }

    public override acknowledgeRemove(): void {
        this.ignore();
    }

    public override acknowledgeRemoveFailed(): void {
        this.ignore();
    }
    public override acknowledgeRemoveIgnored(): void {
        this.ignore();
    }
}