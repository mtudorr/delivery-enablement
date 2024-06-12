import { IdOfStack } from "../../stacks/domain/id-of-stack";
import { Stack } from "../../stacks/domain/stack";
import { StackStateEnum } from "../../stacks/domain/stack-state-enum";

describe("Stack", () => {
    const createTestInstance = (state: StackStateEnum): Stack => {
        return new Stack(new IdOfStack("<REPO>", "<BRANCH>"), state, "<ENV>", "<VERSION>");
    };

    it ("CREATING should transition to READY on 'acknowledgeCreate'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.CREATING);

        // act
        testInstance.acknowledgeCreate();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.READY);
    });

    it ("CREATING should self-transition 'create'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.CREATING);

        // act
        testInstance.create();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.CREATING);
    });

    it ("CREATING should transition to PENDING_BUILD on 'build'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.CREATING);

        // act
        testInstance.build();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.PENDING_BUILD);
    });

    it ("CREATING should transition to PENDING_REMOVE on 'remove'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.CREATING);

        // act
        testInstance.remove();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.PENDING_REMOVE);
    });

    it ("CREATING should transition to CREATING on 'acknowledgeBuild'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.CREATING);

        // act
        testInstance.acknowledgeBuild();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.CREATING);
    });

    it ("CREATING should transition to CREATING on 'acknowledgeRemove'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.CREATING);

        // act
        testInstance.acknowledgeRemove();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.CREATING);
    });
});