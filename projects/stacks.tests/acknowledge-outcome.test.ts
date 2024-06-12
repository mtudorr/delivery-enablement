import { AcknowledgeOutcome } from "../stacks/acknowledge-outcome";
import { createSpyForStack } from "./spy-on-stack";

describe("AcknowledgeOutcome", () => {
    it ("Should initiate 'acknowledgeBuildFailed' trigger on action 'build' and outcome 'fail'", () => {
        // arrange
        const stack = createSpyForStack();
        const testInstance = AcknowledgeOutcome.initializeChain();

        // act
        testInstance.handle("build", "fail", stack);

        // assert
        expect(stack.spyAcknowledgeBuildFailed).toHaveBeenCalledTimes(1);
    });

    it ("Should initiate 'acknowledgeBuildIgnore' trigger on action 'build' and outcome 'ignore'", () => {
        // arrange
        const stack = createSpyForStack();
        const testInstance = AcknowledgeOutcome.initializeChain();

        // act
        testInstance.handle("build", "ignore", stack);

        // assert
        expect(stack.spyAcknowledgeBuildIgnored).toHaveBeenCalledTimes(1);
    });

    it ("Should initiate 'acknowledgeBuild' trigger on action 'build' and outcome 'success'", () => {
        // arrange
        const stack = createSpyForStack();
        const testInstance = AcknowledgeOutcome.initializeChain();

        // act
        testInstance.handle("build", "success", stack);

        // assert
        expect(stack.spyAcknowledgeBuild).toHaveBeenCalledTimes(1);
    });
});
