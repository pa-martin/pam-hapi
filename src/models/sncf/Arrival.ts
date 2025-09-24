import {DepartureEntity} from '@entities/sncf/ResponseEntity';

/**
 * @openapi
 * components:
 *   schemas:
 *     Arrival:
 *       type: object
 *       properties:
 *         arrival:
 *           type: string
 *           format: date-time
 *         base_arrival:
 *           type: string
 *           format: date-time
 *         delay:
 *           type: integer
 *         direction:
 *           type: string
 *         route_direction:
 *           type: string
 *         type:
 *           type: string
 *           enum: [TER, TGV]
 *   examples:
 *     Arrival:
 *       value:
 *         arrival: 2025-06-05T10:11:00.000Z
 *         base_arrival: 2025-06-05T10:11:00.000Z
 *         delay: 0
 *         direction: Le Croisic
 *         route_direction: Nantes
 *         type: TER
 *     Arrivals:
 *       value:
 *         fromNantes:
 *           - arrival: 2025-01-01T10:00:00.000Z
 *             base_arrival: 2025-01-01T10:15:00.000Z
 *             delay: 900
 *             direction: Le Croisic
 *             route_direction: Nantes
 *             type: TER
 *         toNantes:
 *           - arrival: 2025-01-01T10:00:00.000Z
 *             base_arrival: 2025-01-01T10:00:00.000Z
 *             delay: 0
 *             direction: Nantes
 *             route_direction: Nantes
 *             type: TER
 */
export default class Arrival {
    static readonly re = /\((\w|\s|é)+\)/;

    arrival: Date;
    base_arrival: Date;
    delay: number;
    direction: string;
    route_direction: string;
    type: 'TER' | 'TGV';

    constructor(stop: DepartureEntity, isTGV: boolean) {
        this.arrival = Arrival.mapDate(stop.stop_date_time.arrival_date_time);
        this.base_arrival = Arrival.mapDate(stop.stop_date_time.base_arrival_date_time);
        this.delay = (Arrival.mapDate(stop.stop_date_time.arrival_date_time).getTime() -
            Arrival.mapDate(stop.stop_date_time.base_arrival_date_time).getTime()) / 1000;
        this.direction = Arrival.re.exec(stop.display_informations.direction)?.[0].replace(/[()]/g, '') ?? '';
        this.route_direction = Arrival.re.exec(stop.route.direction.name)?.[0].replace(/[()]/g, '') ?? '';
        this.type = isTGV ? 'TGV' : 'TER';
    }

    static mapDate(date: string) {
        return new Date(date.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6'));
    }
}