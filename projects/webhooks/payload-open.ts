import { Repository } from "./github-repository";

export type PayloadOpen = {
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

export const isPayloadOpen = (value: unknown): value is PayloadOpen => {
    return(
        value !== null &&
        typeof value === "object" &&
        "action" in value &&
        value.action === "opened" &&
        "pull_request" in value
    )
}