import Rollbar, { LogArgument } from "rollbar";
import { Environment } from "./environment";
import { Secrets } from "./secrets";

export class Logging {
    private static instance: Logging | null = null;

    private readonly rollbar: Rollbar;

    public constructor(rollbarAccessToken: string) {
        this.rollbar = new Rollbar({
            accessToken: rollbarAccessToken,
            environment: "prd"
        });
    }

    public async error(e: any): Promise<void> {
        this.rollbar.error(e);
        await new Promise<void>(r => this.rollbar.wait(r));
    }

    public static async obtain(environment: Environment, secrets: Secrets): Promise<Logging> {
        if (Logging.instance === null) {
            const accessToken = 
                await secrets.retrieveString(environment.get("SECRET_NAME_ROLLBAR_ACCESS_TOKEN"));

            Logging.instance = new Logging(accessToken);
        }

        return Logging.instance;
    }
}