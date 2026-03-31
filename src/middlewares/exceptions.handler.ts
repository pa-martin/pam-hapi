import {NextFunction, Request, Response} from 'express';
import {Logger} from "@modules/logger";

export interface AppError extends Error {
    status?: number;
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (res.headersSent) {
        // Delegate to default error handler if headers are already sent
        return next(err);
    }

    const log = Logger.instance.getLogger('ErrorHandler');
    const from = err.stack
            ?.split('\n')[1]
            .split('/')
            .find(v => /\d*\.ts/.test(v))
        ?? 'unknown source';

    log.error(`Error from ${from} : ${err.message}`);
    log.trace(err.stack);
    res.status(err.status ?? 500).json({
        message: err.message || 'Internal Server Error',
    });
};