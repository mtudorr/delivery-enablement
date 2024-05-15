export type PayloadClose = {
    action: string;
    pull_request: object
};

export const isPayloadClose = (value: unknown): value is PayloadClose => {
    return(
        value !== null &&
        typeof value === "object" &&
        "action" in value &&
        value.action === "closed" &&
        "pull_request" in value
    )
}