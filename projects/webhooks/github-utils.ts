type Repository = {
    name: string;
}
export type Payload = {
    ref: string;
    before: string;
    after: string;
    repository: Repository;

};

export const extractRepoAndBranchNames = (payload: Payload): { repo: string; branch: string } | null => {
    if (!payload || !payload.repository || !payload.ref) {
        return null;
    }
    
    const repo = payload.repository.name;
    const refParts = payload.ref.split('/');
    const branch = refParts.length === 3 ? refParts[2] : '';

    return { repo, branch };
};