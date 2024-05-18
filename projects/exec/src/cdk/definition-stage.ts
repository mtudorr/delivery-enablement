import * as zod from "zod";
import { schemaDefinitionStep } from "./definition-step";

export const schemaDefinitionStage = zod.object({
    id: zod.string(),
    idOfInputStage: zod.string().optional(),
    environmentVariables: zod.record(zod.string()).readonly(),
    environmentSecrets: zod.array(zod.string()).readonly(),
    steps: zod.array(schemaDefinitionStep).readonly(),
    excludedEnvironments: zod.array(zod.string()).readonly()
});

export type DefinitionStage = Readonly<zod.infer<typeof schemaDefinitionStage>>;
