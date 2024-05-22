import { StackStateEnum } from "../domain/stack-state-enum";

export type DtoStackRecord = {
    readonly repo: string;
    readonly branch: string;
    readonly state: StackStateEnum;
    readonly version: string;
    readonly environmentLabel: string | null;
}
