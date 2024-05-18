import * as zod from "zod";

export const schemaDefinitionEnvironment = zod.object({
    awsAccountId: zod.string(),
    awsRegion: zod.string(),
});

export type DefinitionEnvironment = Readonly<zod.infer<typeof schemaDefinitionEnvironment>>;
