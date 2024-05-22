import { DefinitionConfiguration } from "./definition-configuration";
import { DefinitionEnvironment } from "./definition-environment";
import { DefinitionEnvironmentStable } from "./definition-environment-stable";
import { IdOfSource } from "./id-of-source";

export class Config {
    public readonly idOfSource: IdOfSource;
    public readonly all: DefinitionConfiguration;
    public readonly targetEnvironment: DefinitionEnvironment;
    public readonly targetEnvironmentLabel: string;

    public constructor(idOfSource: IdOfSource, all: DefinitionConfiguration, envionmentLabel: string | null | undefined) {
        this.idOfSource = idOfSource;
        this.all = all;
        const targetEnvironment = this.determineTargetEnvironment(idOfSource, all);

        this.targetEnvironment = targetEnvironment.env;
        const targetEnvironmentLabel = targetEnvironment.envStable?.label ?? envionmentLabel;
        if (targetEnvironmentLabel === undefined || targetEnvironmentLabel === null) {
            throw new Error("Could not determine the environment label");
        }

        this.targetEnvironmentLabel = targetEnvironmentLabel;
    }

    public get targetAwsAccountId(): string {
        return this.targetEnvironment.awsAccountId;
    }

    public get targetAwsRegion(): string {
        return this.targetEnvironment.awsRegion;
    }

    private determineTargetEnvironment(idOfSource: IdOfSource, all: DefinitionConfiguration): { env: DefinitionEnvironment, envStable: DefinitionEnvironmentStable | null } {
        const stableEnvironment = all.environmentStable.find(e => e.branch === idOfSource.branch);
        if (stableEnvironment !== undefined) {
            return { env: stableEnvironment, envStable: stableEnvironment };
        }

        return { env: all.environmentFeature, envStable: null };
    }
}