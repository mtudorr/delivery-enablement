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
});
