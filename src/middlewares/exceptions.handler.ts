import {NextFunction, Request, Response} from 'express';
import {Logger} from "@modules/logger";

export interface AppError extends Error {
    reason: string;
    status?: number;
    thrownBy: string;
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

    const log = Logger.instance.getLogger('ErrorHandler').child({
        'error.cause': err.cause,
        'error.message': err.message,
        'error.name': err.name,
        'error.reason': err.reason,
        'error.stack': err.stack,
        'error.status': err.status ?? 500,
        'error.thrownBy': err.thrownBy,
    });

    log.error(err.message);
    res.status(err.status ?? 500).json({
        message: err.message || 'Internal Server Error',
        reason: err.reason || 'UnknownError',
        'error.cause': err.cause,
        'error.name': err.name,
        'error.stack': err.stack,
        'error.status': err.status ?? 500,
        'error.thrownBy': err.thrownBy,
    });
};