import * as zod from "zod";
import { schemaDefinitionStage } from "./definition-stage";

export const schemaDefinitionPipeline = zod.object({
    stages: zod.array(schemaDefinitionStage).readonly()
});

export type DefinitionPipeline = Readonly<zod.infer<typeof schemaDefinitionPipeline>>;
