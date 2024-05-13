import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

export class Secrets {
    private readonly client: SecretsManagerClient;

    public constructor() {
        this.client = new SecretsManagerClient();
    }

    public async retrieveStringOrNull(secretName: string): Promise<string|null> {
        const input = {
            SecretId: secretName
        };
        
        const cmd = new GetSecretValueCommand(input);
        const res = await this.client.send(cmd);
    
        return res.SecretString ?? null;
    }

    public async retrieveString(secretName: string): Promise<string> {
        const secretOrNull = await this.retrieveStringOrNull(secretName);
        if (secretOrNull === null) {
            throw new Error(`Could not retrieve string value of secret ${secretName}`);
        }

        return secretOrNull;
    }
}