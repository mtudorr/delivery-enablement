import { StackStateEnum } from "../domain/stack-state-enum";
import { Environment } from "./environment";
import { Exec } from "./exec";

export class ExecDispatch {
    private readonly exec: Exec;

    public constructor(enviornment: Environment) {
        this.exec = new Exec(enviornment);
    }

    public for(repoName: string, branchName: string, environmentLabel: string | null, stateBefore: StackStateEnum | null, state: StackStateEnum): Promise<void> {
        if (state === StackStateEnum.CREATING && stateBefore !== StackStateEnum.CREATING) {
            return this.exec.create(repoName, branchName, environmentLabel);
        }

        if (state === StackStateEnum.BUILDING && stateBefore !== StackStateEnum.BUILDING) {
            return this.exec.build(repoName, branchName, environmentLabel);
        }

        return Promise.resolve();
    }
}