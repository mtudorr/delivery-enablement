import { Subscription } from "rxjs";
import { IdOfStack } from "./id-of-stack";
import { StackState } from "./stack-state";
import { StackStateEnum } from "./stack-state-enum";
import { StackStates } from "./stack-states";
import { StackTransition } from "./stack-transition";

export class Stack {
    public readonly id: IdOfStack;
    public readonly version: string;

    private _environmentLabel: string | null;

    private _state: StackState;
    private _stateTransitionSubscription: Subscription;

    public constructor(id: IdOfStack, state: StackStateEnum, environmentLabel: string | null, version: string) {
        this.id = id;
        this.version = version;
        
        this._environmentLabel = environmentLabel;
        this._state = StackStates.for(state);

        this._stateTransitionSubscription = 
            this._state.onTransition.subscribe(t => this.accept(t));
    }

    public get environmentLabel(): string | null {
        return this._environmentLabel;
    }

    public get state(): StackStateEnum {
        return this._state.value;
    }

    public create(): void {
        this._state.create();
    }

    public build(): void {
        this._state.build();
    }

    public remove(): void {
        this._state.remove();
    }

    public acknowledgeCreate(): void {
        this._state.acknowledgeCreate();
    }

    public acknowledgeCreateFailed(): void {
        this._state.acknowledgeCreateFailed();
    }

    public acknowledgeCreateIgnored(): void {
        this._state.acknowledgeCreateIgnored();
    }

    public acknowledgeBuild(): void {
        this._state.acknowledgeBuild();
    }

    public acknowledgeBuildFailed(): void {
        this._state.acknowledgeBuildFailed();
    }

    public acknowledgeBuildIgnored(): void {
        this._state.acknowledgeBuildIgnored();
    }

    public acknowledgeRemove(): void {
        this._state.acknowledgeRemove();
    }

    public acknowledgeRemoveFailed(): void {
        this._state.acknowledgeRemoveFailed();
    }

    public acknowledgeRemoveIgnored(): void {
        this._state.acknowledgeRemoveIgnored();
    }

    private accept(transition: StackTransition): void {
        this._stateTransitionSubscription.unsubscribe();

        this._state = StackStates.for(transition.state);
        this._stateTransitionSubscription =
            this._state.onTransition.subscribe(t => this.accept(t));
    }
}
