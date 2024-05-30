import { StackState } from "./stack-state";
import { StackStateEnum } from "./stack-state-enum";

export class StackStateBuilding extends StackState {
    public constructor() {
        super(StackStateEnum.BUILDING);
    }

    public create(): void {
        this.ignore();
    }

    public build(): void {
        this.transitionTo(StackStateEnum.PENDING_BUILD);
    }

    public remove(): void {
        this.transitionTo(StackStateEnum.PENDING_REMOVE);
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