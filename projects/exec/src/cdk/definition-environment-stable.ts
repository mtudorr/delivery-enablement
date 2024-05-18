import * as zod from "zod";
import { schemaDefinitionEnvironment} from "./definition-environment";

export const schemaDefinitionEnvironmentStable = schemaDefinitionEnvironment.extend({
    label: zod.string(),
    branch: zod.string(),
});

export type DefinitionEnvironmentStable = Readonly<zod.infer<typeof schemaDefinitionEnvironmentStable>>;
