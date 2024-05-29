export class IdOfStack {
    public readonly repo: string;
    public readonly branch: string;

    public constructor(repo: string, branch: string) {
        this.repo = decodeURIComponent(repo);
        this.branch = decodeURIComponent(branch);
    }
}
