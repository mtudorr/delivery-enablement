export class Environment {
    public getOrNull(name: string): string|null {
        return process.env[name] ?? null;
    }   

    public get(name: string): string {
        const value = this.getOrNull(name);
        if (value === null) {
            throw new Error(`Could not retrieve value of variable ${name}`);
        }

        return value;
    }
}