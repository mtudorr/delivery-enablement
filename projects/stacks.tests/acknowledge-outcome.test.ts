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

    it ("Should initiate 'acknowledgeCreate' trigger on action 'create' and outcome 'success'", () => {
        // arrange
        const stack = createSpyForStack();
        const testInstance = AcknowledgeOutcome.initializeChain();

        // act
        testInstance.handle("create", "success", stack);

        // assert
        expect(stack.spyAcknowledgeCreate).toHaveBeenCalledTimes(1);
    });

    it ("Should initiate 'acknowledgeCreate' trigger on action 'create' and outcome 'ignore'", () => {
        // arrange
        const stack = createSpyForStack();
        const testInstance = AcknowledgeOutcome.initializeChain();

        // act
        testInstance.handle("create", "ignore", stack);

        // assert
        expect(stack.spyAcknowledgeCreateIgnored).toHaveBeenCalledTimes(1);
    });

    it ("Should initiate 'acknowledgeCreate' trigger on action 'create' and outcome 'fail'", () => {
        // arrange
        const stack = createSpyForStack();
        const testInstance = AcknowledgeOutcome.initializeChain();

        // act
        testInstance.handle("create", "fail", stack);

        // assert
        expect(stack.spyAcknowledgeCreateFailed).toHaveBeenCalledTimes(1);
    });

    it ("Should initiate 'acknowledgeRemove' trigger on action 'remove' and outcome 'success'", () => {
        // arrange
        const stack = createSpyForStack();
        const testInstance = AcknowledgeOutcome.initializeChain();

        // act
        testInstance.handle("remove", "success", stack);

        // assert
        expect(stack.spyAcknowledgeRemove).toHaveBeenCalledTimes(1);
    });

    it ("Should initiate 'acknowledgeRemoveIgnore' trigger on action 'remove' and outcome 'ignore'", () => {
        // arrange
        const stack = createSpyForStack();
        const testInstance = AcknowledgeOutcome.initializeChain();

        // act
        testInstance.handle("remove", "ignore", stack);

        // assert
        expect(stack.spyAcknowledgeRemoveIgnored).toHaveBeenCalledTimes(1);
    });

    it ("Should initiate 'acknowledgeRemoveFail' trigger on action 'remove' and outcome 'fail'", () => {
        // arrange
        const stack = createSpyForStack();
        const testInstance = AcknowledgeOutcome.initializeChain();

        // act
        testInstance.handle("remove", "fail", stack);

        // assert
        expect(stack.spyAcknowledgeRemoveFailed).toHaveBeenCalledTimes(1);
    });
});
