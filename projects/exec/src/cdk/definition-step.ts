import * as zod from "zod";

export const schemaDefinitionStep = zod.object({
    action: zod.string(),
    commands: zod.array(zod.string()).readonly(),
    excludedEnvironments: zod.array(zod.string()).readonly().optional()
});

export type DefinitionStep = Readonly<zod.infer<typeof schemaDefinitionStep>>;
