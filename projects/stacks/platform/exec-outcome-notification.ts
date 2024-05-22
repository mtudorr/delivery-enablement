export type ExecOutcomeNotification = {
    readonly repo: string;
    readonly branch: string;
    readonly action: "create" | "build" | "remove";
    readonly outcome: "success" | "ignore" | "fail";
};
