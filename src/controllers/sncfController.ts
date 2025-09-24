import {SncfService} from '@services/sncfService';
import {NextFunction, Request, Response} from 'express';

const service = new SncfService();

export const getArrivals = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await service.getArrivals());
    } catch (error) {
        next(error);
    }
};
