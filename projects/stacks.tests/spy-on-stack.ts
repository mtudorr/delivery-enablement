import { IdOfStack } from "../stacks/domain/id-of-stack";
import { StackStateEnum } from "../stacks/domain/stack-state-enum";
import { Stack } from "../stacks/domain/stack";

export class SpyOnStack extends Stack {
    public constructor() {
        super(new IdOfStack("<REPO>", "<BRANCH>"), StackStateEnum.READY, "<ENV>", "<VERSION>");
    }

    public readonly spyCreate: jest.Mock<void> = jest.fn();
    public readonly spyBuild: jest.Mock<void> = jest.fn();
    public readonly spyRemove: jest.Mock<void> = jest.fn();
    public readonly spyAcknowledgeCreate: jest.Mock<void> = jest.fn();
    public readonly spyAcknowledgeCreateFailed: jest.Mock<void> = jest.fn();
    public readonly spyAcknowledgeCreateIgnored: jest.Mock<void> = jest.fn();
    public readonly spyAcknowledgeBuild: jest.Mock<void> = jest.fn();
    public readonly spyAcknowledgeBuildFailed: jest.Mock<void> = jest.fn();
    public readonly spyAcknowledgeBuildIgnored: jest.Mock<void> = jest.fn();
    public readonly spyAcknowledgeRemove: jest.Mock<void> = jest.fn();
    public readonly spyAcknowledgeRemoveFailed: jest.Mock<void> = jest.fn();
    public readonly spyAcknowledgeRemoveIgnored: jest.Mock<void> = jest.fn();

    public create(): void {
        this.spyCreate();
    }

    public build(): void {
        this.spyBuild();
    }

    public remove(): void {
        this.spyRemove();
    }

    public acknowledgeCreate(): void {
        this.spyAcknowledgeCreate();
    }

    public acknowledgeCreateFailed(): void {
        this.spyAcknowledgeCreateFailed();
    }

    public acknowledgeCreateIgnored(): void {
        this.spyAcknowledgeCreateIgnored();
    }

    public acknowledgeBuild(): void {
        this.spyAcknowledgeBuild();
    }

    public acknowledgeBuildFailed(): void {
        this.spyAcknowledgeBuildFailed();
    }

    public acknowledgeBuildIgnored(): void {
        this.spyAcknowledgeBuildIgnored();
    }

    public acknowledgeRemove(): void {
        this.spyAcknowledgeRemove();
    }

    public acknowledgeRemoveFailed(): void {
        this.spyAcknowledgeRemoveFailed();
    }

    public acknowledgeRemoveIgnored(): void {
        this.spyAcknowledgeRemoveIgnored();
    }
};

export const createSpyForStack = (): SpyOnStack => {
    return new SpyOnStack();
};