import { DefinitionStep } from "./definition-step";

export type DefinitionStage = {
    readonly id: string;
    readonly environmentImage: string;
    readonly environmentVariables: ReadonlyArray<readonly [string, string]>;
    readonly environmentSecrets: readonly string[];
    readonly steps: readonly DefinitionStep[];
}
