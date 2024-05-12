import * as dynamoDb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class DynamoDb {
    public readonly tableStacks: dynamoDb.Table;

    public constructor(scope: Construct) {
        this.tableStacks = new dynamoDb.Table(scope, "Dynamo/Table-Stacks", {
            tableName: "delivery-enablement-table-stacks",
            billingMode: dynamoDb.BillingMode.PAY_PER_REQUEST,
            partitionKey: {
                name: "Repo",
                type: dynamoDb.AttributeType.STRING
            },
            sortKey: {
                name: "Branch",
                type: dynamoDb.AttributeType.STRING
            }
        });
    }
}