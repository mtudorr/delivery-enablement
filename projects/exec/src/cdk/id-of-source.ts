export class IdOfSource {
    public readonly repo: string;
    public readonly branch: string;

    public constructor(repo: string, branch: string) {
        this.repo = repo;
        this.branch = branch;
    }

    public toString(): string {
        return `${this.repo}-${this.branch}`;
    }
}
