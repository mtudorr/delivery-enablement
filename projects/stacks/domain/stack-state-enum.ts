export enum StackStateEnum {
    CREATING = "creating",
    READY = "ready",
    BUILDING = "building",
    REMOVING = "removing",
    PENDING_BUILD = "pending_build",
    PENDING_REMOVE = "pending_remove",
    PENDING_CREATE = "pending_create",
};

const all: readonly string[] = Object.values(StackStateEnum);

export const isStackStateEnum = (value: unknown): value is StackStateEnum => {
    return typeof value === "string" && all.includes(value);
}
