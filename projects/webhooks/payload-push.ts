import { Repository } from "./github-repository";

export type PayloadPush = {
    ref: string;
    before: string;
    after: string;
    repository: Repository;
};

export const isPayloadPush = (value: unknown): value is PayloadPush => {
    return(
        value !== null &&
        typeof value === "object" &&
        "ref" in value &&
        "before" in value &&
        "after" in value
    )
}

export const hasChanges = (payload: PayloadPush): boolean => {
    return payload.after !== payload.before;
};