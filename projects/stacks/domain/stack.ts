import { Subscription } from "rxjs";
import { IdOfStack } from "./id-of-stack";
import { StackState } from "./stack-state";
import { StackStateEnum } from "./stack-state-enum";
import { StackStates } from "./stack-states";
import { StackTransition } from "./stack-transition";

export class Stack {
    public readonly id: IdOfStack;
    public readonly version: string;

    private _state: StackState;
    private _stateTransitionSubscription: Subscription;

    public constructor(id: IdOfStack, state: StackStateEnum, version: string) {
        this.id = id;
        this.version = version;
        
        this._state = StackStates.for(state);

        this._stateTransitionSubscription = 
            this._state.onTransition.subscribe(t => this.accept(t));
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

    private accept(transition: StackTransition): void {
        this._stateTransitionSubscription.unsubscribe();

        this._state = StackStates.for(transition.state);
        this._stateTransitionSubscription =
            this._state.onTransition.subscribe(t => this.accept(t));
    }
}
