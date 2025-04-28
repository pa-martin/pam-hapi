import qs from 'qs';
import {NextFunction, Request, Response} from 'express';
import NextMatch from "@models/pandaScore/NextMatch";
import {PandaScoreService} from "@services/pandaScoreService";

const service = new PandaScoreService();

export const getTeamsByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParam = qs.parse(qs.stringify(req.query))
        res.json(await service.getTeamsByName(queryParam.teamName as string));
    } catch (error) {
        next(error);
    }
};

export const getNextMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParam = qs.parse(qs.stringify(req.query))
        const teams = await service.getTeamsByName(queryParam.teamName as string);
        const nextMatches: NextMatch[] = [];
        for (const team of teams) {
            nextMatches.push(await service.getNextMatch(team));
        }
        res.json(nextMatches);
    } catch (error) {
        next(error);
    }
};
