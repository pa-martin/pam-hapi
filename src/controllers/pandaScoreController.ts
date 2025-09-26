import {PandaScoreService} from '@services/pandaScoreService';
import {NextFunction, Request, Response} from 'express';
import qs from 'qs';

const service = new PandaScoreService();

export const getTeamsByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParam = qs.parse(qs.stringify(req.query));
        res.json(await service.getTeamsByName(queryParam.teamName as string));
    } catch (error) {
        next(error);
    }
};

export const getNextMatchesByTeamName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParam = qs.parse(qs.stringify(req.query));
        res.json(await service.getNextMatchesByTeamName(queryParam.teamName as string));
    } catch (error) {
        next(error);
    }
};
