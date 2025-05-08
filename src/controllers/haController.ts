import {HaService} from '@services/haService';
import {NextFunction, Request, Response} from 'express';
import qs from 'qs';

const service = new HaService();

export const getHaConf = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParam = qs.parse(qs.stringify(req.query));
        res.json(await service.getHaConf(queryParam.weekday as string));
    } catch (error) {
        next(error);
    }
};