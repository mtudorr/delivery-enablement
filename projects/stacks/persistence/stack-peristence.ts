import { 
    DynamoDBClient, GetItemCommand, GetItemCommandInput ,
    PutItemCommand, PutItemCommandInput
} from "@aws-sdk/client-dynamodb"

import { IdOfStack } from "../domain/id-of-stack";
import { DtoStackRecord } from "./dto-stack-record";
import { Environment } from "../platform/environment";
import { isStackStateEnum } from "../domain/stack-state-enum";
import { ErrorConflict } from "../platform/error-conflict";
import { Version } from "./version";

export class StackPersistence {
    private readonly environment: Environment;
    private readonly client: DynamoDBClient;

    public constructor(environment: Environment) {
        this.environment = environment;
        this.client = new DynamoDBClient();
    }

    public async retrieveOrNull(id: IdOfStack): Promise<DtoStackRecord|null> {
        const input: GetItemCommandInput = {
            TableName: this.environment.get("TABLE_STACKS_NAME"),
            Key: {
                Repo: { S: id.repo },
                Branch: { S: id.branch }
            }
        };

        const cmd = new GetItemCommand(input);
        const res = await this.client.send(cmd);

        console.log(id, res.Item);

        if (res.Item === undefined || 
            res.Item.Repo?.S === undefined ||
            res.Item.Branch?.S === undefined ||
            res.Item.State?.S === undefined ||
            res.Item.Version?.S === undefined ||
            res.Item.EnvironmentLabel?.S === undefined
        ) {
            return null;
        }

        const valueOfState = res.Item.State.S;
        if (isStackStateEnum(valueOfState)) {
            return {
                repo: res.Item.Repo.S,
                branch: res.Item.Branch.S,
                state: valueOfState,
                version: res.Item.Version.S,
                environmentLabel: res.Item.EnvironmentLabel.S === "$NULL" ? null : res.Item.EnvironmentLabel.S
            }
        }

        return null;
    }

    public async save(record: DtoStackRecord): Promise<void> {
        var input: PutItemCommandInput = {
            TableName: this.environment.get("TABLE_STACKS_NAME"),
            Item: {
                Repo: { S: record.repo },
                Branch: { S: record.branch },
                State: { S: record.state },
                EnvironmentLabel: { S: record.environmentLabel ?? "$NULL" },
                Version: { S: Version.new() }
            },
            ConditionExpression: "attribute_not_exists(Repo) or Version = :version",
            ExpressionAttributeValues: {
                ":version": { S: record.version }
            }
        }

        const cmd = new PutItemCommand(input);
        
        try {
            await this.client.send(cmd);
        }
        catch (e: unknown) {
            const error = e as { name?: string };
            if (error.name === "ConditionalCheckFailedException") {
                throw new ErrorConflict();
            }

            throw e;
        }
    }
}