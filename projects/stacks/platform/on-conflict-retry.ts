import { ErrorConflict } from "./error-conflict";

export class OnConflictRetry<T> {
    private readonly max = 3;
    private readonly fn: () => Promise<T>;
    private count: number = 0;

    public constructor(fn: () => Promise<T>) {
        this.fn = fn;
    }

    public async execute(): Promise<T> {
        try {
            return await this.fn();
        }
        catch (e: unknown) {
            if (e instanceof ErrorConflict && this.count++ < this.max) {
                return await this.execute();
            }

            throw e;
        }
    }
}