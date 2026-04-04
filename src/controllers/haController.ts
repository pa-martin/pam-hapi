import {HaService} from '@services/haService';
import {NextFunction, Request, Response} from 'express';
import qs from 'qs';
import {Logger} from "@modules/logger";
import {PandaScoreError} from "@errors/PandaScoreError";

const service = new HaService();
const logger = Logger.instance.getLogger('HaController');

export const getHaConf = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParam = qs.parse(qs.stringify(req.query));
        res.json(await service.getHaConf(queryParam.weekday as string));
    } catch (error) {
        if (error instanceof PandaScoreError) {
            throw error;
        }
        logger.error(`Error fetching HA configuration: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
        const err = new PandaScoreError('HaConfFetchError', 'getHaConf');
        if (error instanceof Error) {
            err.message = `Error fetching HA configuration: ${error.message}`;
            err.stack = error.stack;
            err.cause = error.cause;
            err.name = error.name;
        } else {
            err.stack = JSON.stringify(error);
        }
        next(error);
        throw err;
    }
};