import { StackState } from "./stack-state";
import { StackStateBuilding } from "./stack-state-building";
import { StackStateBuilt } from "./stack-state-built";
import { StackStateCreating } from "./stack-state-creating";
import { StackStateEnum } from "./stack-state-enum";
import { StackStatePendingBuild } from "./stack-state-pending-build";
import { StackStatePendingCreate } from "./stack-state-pending-create";
import { StackStatePendingRecreate } from "./stack-state-pending-recreate";
import { StackStatePendingRemove } from "./stack-state-pending-remove";
import { StackStateReady } from "./stack-state-ready";
import { StackStateRemoved } from "./stack-state-removed";
import { StackStateRemoving } from "./stack-state-removing";

export class StackStates {
    public static for(value: StackStateEnum): StackState {
        switch (value) {
            case StackStateEnum.CREATING:
                return new StackStateCreating();
            case StackStateEnum.READY:
                return new StackStateReady();
            case StackStateEnum.BUILDING:
                return new StackStateBuilding();
            case StackStateEnum.REMOVING:
                return new StackStateRemoving();
            case StackStateEnum.REMOVED:
                return new StackStateRemoved();
            case StackStateEnum.PENDING_BUILD:
                return new StackStatePendingBuild();
            case StackStateEnum.PENDING_REMOVE:
                return new StackStatePendingRemove();
            case StackStateEnum.PENDING_CREATE:
                return new StackStatePendingCreate();
            case StackStateEnum.PENDING_RECREATE:
                return new StackStatePendingRecreate();
            case StackStateEnum.BUILT:
                return new StackStateBuilt();
            case StackStateEnum.FAILED:
                throw new Error("Not implemented");
        }
    }
}