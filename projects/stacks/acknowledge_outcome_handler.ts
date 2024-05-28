import { Stack } from "./domain/stack";
import { CreateSuccessOutcomeHandler } from "./acknowledge_outcome_handlers/create_success_outcome_handler";
import { CreateFailOutcomeHandler } from "./acknowledge_outcome_handlers/create_fail_outcome_handler";
import { CreateIgnoreOutcomeHandler } from "./acknowledge_outcome_handlers/create_ignore_outcome_handler";
import { BuildSuccessOutcomeHandler } from "./acknowledge_outcome_handlers/build_success_outcome_handler";
import { BuildFailOutcomeHandler } from "./acknowledge_outcome_handlers/build_fail_outcome_handler";
import { BuildIgnoreOutcomeHandler } from "./acknowledge_outcome_handlers/build_ignore_outcome_handler";
import { RemoveSuccessOutcomeHandler } from "./acknowledge_outcome_handlers/remove_success_outcome_handler";
import { RemoveFailOutcomeHandler } from "./acknowledge_outcome_handlers/remove_fail_outcome_handler";
import { RemoveIgnoreOutcomeHandler } from "./acknowledge_outcome_handlers/remove_ignore_outcome_handler";

interface AcknowledgeOutcomeHandler {
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

    public static initializeChain(): AcknowledgeOutcomeHandler {
        const createSuccessOutcomeHandler = new CreateSuccessOutcomeHandler();
        const createFailOutcomeHandler = new CreateFailOutcomeHandler();
        const createIgnoreOutcomeHandler = new CreateIgnoreOutcomeHandler();
        const buildSuccessOutcomeHandler = new BuildSuccessOutcomeHandler();
        const buildFailOutcomeHandler = new BuildFailOutcomeHandler();
        const buildIgnoreOutcomeHandler = new BuildIgnoreOutcomeHandler();
        const removeSuccessOutcomeHandler = new RemoveSuccessOutcomeHandler();
        const removeFailOutcomeHandler = new RemoveFailOutcomeHandler();
        const removeIgnoreOutcomeHandler = new RemoveIgnoreOutcomeHandler();

        createSuccessOutcomeHandler
        .setNext(createFailOutcomeHandler)
        .setNext(createIgnoreOutcomeHandler)
        .setNext(buildSuccessOutcomeHandler)
        .setNext(buildFailOutcomeHandler)
        .setNext(buildIgnoreOutcomeHandler)
        .setNext(removeSuccessOutcomeHandler)
        .setNext(removeFailOutcomeHandler)
        .setNext(removeIgnoreOutcomeHandler);
        return createSuccessOutcomeHandler;
    }
}

