import { ECSClient, KeyValuePair, RunTaskCommand, StartTaskCommand } from "@aws-sdk/client-ecs";
import { Environment } from "./environment";

export class Exec {
    private readonly enviornment: Environment;

    public constructor(enviornment: Environment) {
        this.enviornment = enviornment;
    }

    public async create(repo: string, branch: string, environmentLabel: string | null): Promise<void> {
        const env: KeyValuePair[] = [
            { name: "REPO", value: repo },
            { name: "BRANCH", value: branch }
        ];

        if (environmentLabel !== null) {
            env.push({ name: "ENV_LABEL", value: environmentLabel });
        }
        
        await this.runTask(this.enviornment.get("EXEC_TASK_CREATE_NAME"), env);
    }

    private async runTask(taskDefinition: string, env: readonly KeyValuePair[]): Promise<void> {
        const client = new ECSClient();
        const cmd = new RunTaskCommand({
            taskDefinition: taskDefinition,
            cluster: this.enviornment.get("EXEC_CLUSTER_ARN"),
            launchType: "FARGATE",
            overrides: {
                containerOverrides: [
                    {
                        environment: [ ...env ],
                        name: this.enviornment.get("EXEC_CONTAINER_CREATE_NAME")
                    }
                ],
            },
            networkConfiguration: {
                awsvpcConfiguration: {
                    subnets: [ this.enviornment.get("EXEC_SUBNET_ID") ],
                    securityGroups: [ this.enviornment.get("EXEC_SECURITY_GROUP_ID") ],
                    assignPublicIp: "ENABLED"
                }
            }
        });

        const res = await client.send(cmd);
        if (res.failures !== undefined && res.failures.length > 0) {
            throw new Error("Failed to run task: " + res.failures.flatMap(f => `${f.reason}: ${f.detail}`).join("\n"));
        }
    }
}