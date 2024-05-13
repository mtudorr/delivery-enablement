import { Environment } from "./environment";
import { Secrets } from "./secrets";

export class Stacks {
    private readonly secrets: Secrets;
    private readonly environment: Environment;

    public constructor(environment: Environment, secrets: Secrets) {
        this.secrets = secrets;
        this.environment = environment;
    }

    public async create(repo: string, branch: string): Promise<void> {
        const url = this.getUrlAbsoluteFor(`repos/${repo}/branches/${branch}/create`);

        const result = await fetch(url, { 
            method: "POST", 
            headers: await this.getSignatureHeaders() 
        });
        this.throwOnHttpFailure(result);
    }

    public async build(repo: string, branch: string): Promise<void> {
        const url = this.getUrlAbsoluteFor(`repos/${repo}/branches/${branch}/build`);

        const result = await fetch(url, { 
            method: "POST", 
            headers: await this.getSignatureHeaders() 
        });
        this.throwOnHttpFailure(result);
    }

    public async remove(repo: string, branch: string): Promise<void> {
        const url = this.getUrlAbsoluteFor(`repos/${repo}/branches/${branch}/remove`);

        const result = await fetch(url, { 
            method: "POST", 
            headers: await this.getSignatureHeaders() 
        });
        this.throwOnHttpFailure(result);
    }

    private throwOnHttpFailure(result: Response): void {
        const isNotSuccessStatus = result.status < 200 || result.status >= 300;
        if (isNotSuccessStatus) {
            throw new Error(`Request failed ${result.status}`);
        }
    }

    private async getSignatureHeaders(): Promise<Record<string, string>> {
        return {
            "x-api-key": await this.secrets
                .retrieveString(this.environment.get("SECRET_NAME_STACKS_KEY"))
        };
    }

    private getUrlAbsoluteFor(urlRelative: string, version: string = "v1"): string {
        let urlRoot = this.environment.get("API_STACKS_ROOT");

        const appendSlash = !urlRoot.endsWith("/");
        if (appendSlash) {
            urlRoot += "/";
        }

        return `${urlRoot}${version}/${urlRelative}`;
    }
}