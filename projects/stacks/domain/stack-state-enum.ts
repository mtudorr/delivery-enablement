export enum StackStateEnum {
    CREATING = "creating",
    READY = "ready",
    BUILDING = "building",
    BUILT = "built",
    REMOVING = "removing",
    REMOVED = "removed",
    FAILED = "failed",
    PENDING_BUILD = "pending_build",
    PENDING_REMOVE = "pending_remove",
    PENDING_CREATE = "pending_create",
    PENDING_RECREATE = "pending_recreate"
};

const all: readonly string[] = Object.values(StackStateEnum);

export const isStackStateEnum = (value: unknown): value is StackStateEnum => {
    return typeof value === "string" && all.includes(value);
}
