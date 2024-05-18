import * as zod from "zod";
import { schemaDefinitionEnvironment } from "./definition-environment";
import { schemaDefinitionEnvironmentStable } from "./definition-environment-stable";
import { schemaDefinitionPipeline } from "./definition-pipeline";

export const schemaDefinitionConfiguration = zod.object({
    environmentFeature: schemaDefinitionEnvironment,
    environmentStable: zod.array(schemaDefinitionEnvironmentStable).readonly(),
    pipeline: schemaDefinitionPipeline
});

export type DefinitionConfiguration = Readonly<zod.infer<typeof schemaDefinitionConfiguration>>;