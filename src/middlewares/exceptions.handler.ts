import {NextFunction, Request, Response} from 'express';

export interface AppError extends Error {
    status?: number;
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.headersSent) {
        // Delegate to default error handler if headers are already sent
        return next(err);
    }

    console.error(err);
    res.status(err.status ?? 500).json({
        message: err.message || 'Internal Server Error',
    });
};