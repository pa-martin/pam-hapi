export class PandaScoreError extends Error {
    error: string;

    constructor(error: string, message: string) {
        super(message);

        this.error = error;
        this.name = 'PandaScoreError';
        Object.setPrototypeOf(this, PandaScoreError.prototype);
    }
}