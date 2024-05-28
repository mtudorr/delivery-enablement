import { Repository } from "./github-repository";

export type PayloadClose = {
    action: string;
    pull_request: {
        id: number,
        number: number,
        state: string,
        head: {
            ref: string
        }
    },
    repository: Repository;
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