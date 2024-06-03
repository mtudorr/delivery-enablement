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
});