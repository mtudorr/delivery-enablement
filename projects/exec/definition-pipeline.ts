import { DefinitionPipelineStage } from "./definition-pipeline-stage";

export type DefinitionPipeline = {
    readonly id: string;
    readonly stages: readonly DefinitionPipelineStage[];
}

