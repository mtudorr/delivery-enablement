import { GetCallerIdentityCommand, STSClient } from "@aws-sdk/client-sts";

export class AwsContext {
    public readonly accountId: string;

    private constructor(accountId: string) {
        this.accountId = accountId;
    }

    public static async acquire(): Promise<AwsContext> {
        const cmd = new GetCallerIdentityCommand();
        const res = await new STSClient().send(cmd);

        return new AwsContext(res.Account ?? "NOT-AVAILABLE");
    }
}
