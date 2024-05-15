export type PayloadOpen = {
    action: string;
    pull_request: object
};

export const isPayloadOpen = (value: unknown): value is PayloadOpen => {
    return(
        value !== null &&
        typeof value === "object" &&
        "action" in value &&
        value.action === "opened" &&
        "pull_request" in value
    )
}