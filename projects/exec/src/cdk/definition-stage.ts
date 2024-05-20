import * as zod from "zod";
import { schemaDefinitionStep } from "./definition-step";

export const schemaDefinitionStage = zod.object({
    id: zod.string(),
    idOfInputStage: zod.string().optional(),
    steps: zod.array(schemaDefinitionStep).readonly(),
    outputFiles: zod.array(zod.string()).readonly().optional(),
    excludedEnvironments: zod.array(zod.string()).readonly().optional()
});

export type DefinitionStage = Readonly<zod.infer<typeof schemaDefinitionStage>>;
