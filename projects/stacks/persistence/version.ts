import * as uuid from "uuid";

export class Version {
    public static none(): string {
        return "";
    }

    public static new(): string {
        return uuid.v4();
    }
}
