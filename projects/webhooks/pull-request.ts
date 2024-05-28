import { PayloadClose } from "./payload-close";
import { PayloadOpen } from "./payload-open";


export function extractPullRequestTag(payload: PayloadClose | PayloadOpen): string | null {
    return payload.pull_request?.number ? "PR" + String(payload.pull_request.number) : null;
}