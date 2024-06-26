import { PayloadPush, isPayloadPush } from './payload-push';
import { PayloadOpen, isPayloadOpen } from './payload-open';
import { PayloadClose, isPayloadClose } from './payload-close';

type Payload = PayloadPush | PayloadOpen | PayloadClose;

export type { Payload };

export function extractRepoAndBranchNames(payload: Payload): { repo: string; branch: string } | null {
    const pushPattern = /refs\/heads\/(.+)/;
    const repo = payload.repository.name;
    let branch = '';

    if (isPayloadPush(payload)) {
        const match = payload.ref.match(pushPattern);
        if(match) {
            branch = match[1];
        }
    } else if (isPayloadOpen(payload) || isPayloadClose(payload)) {
        branch = payload.pull_request.head.ref;
    } else {
        return null;
    }

    return { repo, branch };
}