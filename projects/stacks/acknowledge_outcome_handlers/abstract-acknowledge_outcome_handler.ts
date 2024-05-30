import { Stack } from "../domain/stack";

export interface AcknowledgeOutcomeHandler {
    setNext(handler: AcknowledgeOutcomeHandler): AcknowledgeOutcomeHandler;
    handle(action: string, outcome: string, stack: Stack): void;
}

export abstract class AbstractAcknowledgeOutcomeHandler implements AcknowledgeOutcomeHandler {
    private nextHandler: AcknowledgeOutcomeHandler | null = null;

    public setNext(handler: AcknowledgeOutcomeHandler): AcknowledgeOutcomeHandler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(action: string, outcome: string, stack: Stack): void {
        if (this.nextHandler) {
            this.nextHandler.handle(action, outcome, stack);
        }
    }

    public addHandlers(handlers: AcknowledgeOutcomeHandler[]): void {
        if (handlers.length === 0) return;

        let currentHandler: AcknowledgeOutcomeHandler = this;
        for (const handler of handlers) {
            currentHandler = currentHandler.setNext(handler);
        }
    }
}

