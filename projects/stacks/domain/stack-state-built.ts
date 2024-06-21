import { StackState } from "./stack-state";
import { StackStateEnum } from "./stack-state-enum";

export class StackStateBuilt extends StackState {
    public constructor() {
        super(StackStateEnum.BUILT);
    }

    public create(): void {
        this.ignore();
    }

    public build(): void {
        this.selfTransition();
    }

    public remove(): void {
        this.remove();
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
        this.selfTransition();
    }

    public override acknowledgeBuildFailed(): void {
        this.ignore();
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
