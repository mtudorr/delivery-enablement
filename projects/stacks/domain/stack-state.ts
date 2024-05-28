import { StackStateEnum } from "./stack-state-enum";
import { Observable, Subject } from "rxjs";
import { StackTransition } from "./stack-transition";

export abstract class StackState {
    private readonly _onTransition: Subject<StackTransition>;
    
    public readonly value: StackStateEnum;

    public constructor(value: StackStateEnum) {
        this._onTransition = new Subject();

        this.value = value;
    }

    public get onTransition(): Observable<StackTransition> {
        return this._onTransition;
    }

    public abstract create(): void;

    public abstract build(): void;

    public abstract remove(): void;

    public abstract acknowledgeCreate(): void;

    public abstract acknowledgeCreateFailed(): void;

    public abstract acknowledgeCreateIgnored(): void;

    public abstract acknowledgeBuild(): void;

    public abstract acknowledgeBuildFailed(): void;

    public abstract acknowledgeBuildIgnored(): void;

    public abstract acknowledgeRemove(): void;

    public abstract acknowledgeRemoveFailed(): void;

    public abstract acknowledgeRemoveIgnored(): void;

    protected transitionTo(state: StackStateEnum): void {
        this._onTransition.next(new StackTransition(state));
    }

    protected selfTransition(): void {
    }

    protected ignore(): void {
    }
}
