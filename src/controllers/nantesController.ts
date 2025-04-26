import qs from 'qs';
import {NextFunction, Request, Response} from 'express';
import {NantesService} from "@services/NantesService";

const service = new NantesService();

export const getPools = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParam = qs.parse(qs.stringify(req.query))
        res.json(await service.getPools(queryParam.city as string));
    } catch (error) {
        next(error);
    }
};

export const getSchedules = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParam = qs.parse(qs.stringify(req.query))
        res.json(await service.getPoolsSchedules(
            queryParam.weekday as string,
            queryParam.city as string,
        ));
    } catch (error) {
        next(error);
    }
};

export const getEquipmentSchedules = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParam = qs.parse(qs.stringify(req.query))
        res.json(await service.getEquipmentSchedules(
            queryParam.type as string,
            queryParam.weekday as string,
            queryParam.equipmentName as string,
        ));
    } catch (error) {
        next(error);
    }
};