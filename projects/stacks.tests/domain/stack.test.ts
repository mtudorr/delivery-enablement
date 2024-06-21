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

    it ("CREATING should transition to FAILED(FAULTED) on 'acknowledgeCreateFail'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.CREATING);

        // act
        testInstance.acknowledgeCreateFailed();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.READY);
    });

    it ("CREATING should ignore on 'acknowledgeCreateIgnore'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.CREATING);

        // act
        testInstance.acknowledgeCreateIgnored();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.CREATING);
    });

    it ("CREATING should ignore on 'acknowledgeBuild'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.CREATING);

        // act
        testInstance.acknowledgeBuild();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.CREATING);
    });

    it ("CREATING should ignore on 'acknowledgeBuildFail'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.CREATING);

        // act
        testInstance.acknowledgeBuildFailed();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.CREATING);
    });

    it ("CREATING should ignore on 'acknowledgeBuildIgnore'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.CREATING);

        // act
        testInstance.acknowledgeBuildIgnored();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.CREATING);
    });

    it ("CREATING should ignore on 'acknowledgeRemove'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.CREATING);

        // act
        testInstance.acknowledgeRemove();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.CREATING);
    });

    it ("CREATING should ignore on 'acknowledgeRemoveFail'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.CREATING);

        // act
        testInstance.acknowledgeRemoveFailed();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.CREATING);
    });

    it ("CREATING should ignore on 'acknowledgeRemoveIgnore'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.CREATING);

        // act
        testInstance.acknowledgeRemoveIgnored();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.CREATING);
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

    it ("BUILDING should transition to PENDING_CREATE on 'create'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.BUILDING);

        // act
        testInstance.create();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.PENDING_CREATE);
    });

    it ("BUILDING should transition to PENDING_BUILD on 'build'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.BUILDING);

        // act
        testInstance.build();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.PENDING_BUILD);
    });

    it ("BUILDING should transition to PENDING_REMOVE on 'remove'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.BUILDING);

        // act
        testInstance.remove();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.PENDING_REMOVE);
    });

    it ("BUILDING should ignore on 'acknowledgeCreate'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.BUILDING);

        // act
        testInstance.acknowledgeCreate();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.BUILDING);
    });

    it ("BUILDING should ignore on 'acknowledgeCreateFail'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.BUILDING);

        // act
        testInstance.acknowledgeCreateFailed();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.BUILDING);
    });

    it ("BUILDING should ignore on 'acknowledgeCreateIgnore'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.BUILDING);

        // act
        testInstance.acknowledgeCreateIgnored();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.BUILDING);
    });

    it ("BUILDING should transition to READY on 'acknowledgeBuild'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.BUILDING);

        // act
        testInstance.acknowledgeBuild();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.READY);
    });

    it ("BUILDING should transition to READY on 'acknowledgeBuildFailed'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.BUILDING);

        // act
        testInstance.acknowledgeBuildFailed();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.READY);
    });

    it ("BUILDING should self-transition on 'acknowledgeBuildIgnored'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.BUILDING);

        // act
        testInstance.acknowledgeBuildIgnored();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.BUILDING);
    });

    it ("BUILDING should ignore on 'acknowledgeRemove'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.BUILDING);

        // act
        testInstance.acknowledgeRemove();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.BUILDING);
    });

    it ("BUILDING should ignore on 'acknowledgeRemoveFail'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.BUILDING);

        // act
        testInstance.acknowledgeRemoveFailed();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.BUILDING);
    });

    it ("BUILDING should ignore on 'acknowledgeRemoveIgnore'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.BUILDING);

        // act
        testInstance.acknowledgeRemoveIgnored();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.BUILDING);
    });

    it ("REMOVING should transition to PENDING_RECREATE on 'create'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.REMOVING);

        // act
        testInstance.create();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.PENDING_RECREATE);
    });

    it ("REMOVING should transition to PENDING_BUILD on 'build'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.REMOVING);

        // act
        testInstance.build();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.PENDING_BUILD);
    });

    it ("REMOVING should ignore on 'remove'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.REMOVING);

        // act
        testInstance.remove();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.REMOVING);
    });

    it ("REMOVING should ignore on 'acknowledgeCreate'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.REMOVING);

        // act
        testInstance.acknowledgeCreate();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.REMOVING);
    });

    it ("REMOVING should ignore on 'acknowledgeCreateFail'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.REMOVING);

        // act
        testInstance.acknowledgeCreateFailed();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.REMOVING);
    });

    it ("REMOVING should ignore on 'acknowledgeCreateIgnore'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.REMOVING);

        // act
        testInstance.acknowledgeCreateIgnored();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.REMOVING);
    });

    it ("REMOVING should ignore on 'acknowledgeBuild'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.REMOVING);

        // act
        testInstance.acknowledgeBuild();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.REMOVING);
    });

    it ("REMOVING should ignore on 'acknowledgeBuildFail'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.REMOVING);

        // act
        testInstance.acknowledgeBuildFailed();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.REMOVING);
    });

    it ("REMOVING should ignore on 'acknowledgeBuildIgnore'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.REMOVING);

        // act
        testInstance.acknowledgeBuildIgnored();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.REMOVING);
    });

    it ("REMOVING should transition to REMOVED on 'acknowledgeRemove'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.REMOVING);

        // act
        testInstance.acknowledgeRemove();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.REMOVED);
    });

    it ("REMOVING should transition to READY on 'acknowledgeRemoveFail'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.REMOVING);

        // act
        testInstance.acknowledgeRemoveFailed();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.READY);
    });

    it ("REMOVING should ignore on 'acknowledgeRemoveIgnore'", () => {
        // arrange
        const testInstance = createTestInstance(StackStateEnum.REMOVING);

        // act
        testInstance.acknowledgeRemoveIgnored();

        // assert
        expect(testInstance.state).toBe(StackStateEnum.REMOVING);
    });
});