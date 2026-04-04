import {AppError} from "@middlewares/exceptions.handler";

export class PandaScoreError implements AppError {
    cause?: unknown;
    name: string;
    message: string;
    reason: string;
    stack?: string;
    status?: number;
    thrownBy: string;

    constructor(reason: string, thrownBy: string, message?: string) {
        this.message = message || `An error occurred for the reason ${reason}`;
        this.name = 'PandaScoreError';
        this.reason = reason;
        this.thrownBy = thrownBy;
    }

}