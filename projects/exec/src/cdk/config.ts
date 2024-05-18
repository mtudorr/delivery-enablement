import { DefinitionConfiguration } from "./definition-configuration";
import { DefinitionEnvironment } from "./definition-environment";
import { IdOfSource } from "./id-of-source";

export class Config {
    public readonly idOfSource: IdOfSource;
    public readonly all: DefinitionConfiguration;
    public readonly targetEnvironment: DefinitionEnvironment;

    public constructor(idOfSource: IdOfSource, all: DefinitionConfiguration) {
        this.idOfSource = idOfSource;
        this.all = all;
        this.targetEnvironment = this.determineTargetEnvironment(idOfSource, all);
    }

    public get targetAwsAccountId(): string {
        return this.targetEnvironment.awsAccountId;
    }

    public get targetAwsRegion(): string {
        return this.targetEnvironment.awsRegion;
    }

    private determineTargetEnvironment(idOfSource: IdOfSource, all: DefinitionConfiguration): DefinitionEnvironment {
        const stableEnvironment = all.environmentStable.find(e => e.branch === idOfSource.branch);
        if (stableEnvironment !== undefined) {
            return stableEnvironment;
        }

        return all.environmentFeature;
    }
}