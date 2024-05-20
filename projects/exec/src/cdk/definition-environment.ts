import * as zod from "zod";

export const schemaDefinitionEnvironment = zod.object({
    awsAccountId: zod.string(),
    awsRegion: zod.string(),
    environmentVariables: zod.record(zod.string()).readonly().optional(),
    environmentSecrets: zod.array(zod.string()).readonly().optional(),
});

export type DefinitionEnvironment = Readonly<zod.infer<typeof schemaDefinitionEnvironment>>;
