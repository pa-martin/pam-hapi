import ScheduleEntity from '@entities/nantes/ScheduleEntity';

/**
 * @openapi
 * components:
 *   schemas:
 *     OpenTime:
 *       type: object
 *       properties:
 *         heure_debut:
 *           type: string
 *         heure_fin:
 *           type: string
 */
export class OpenTime {
    heure_debut: string; // HH:MM
    heure_fin: string;

    static compare(a: OpenTime, b: OpenTime): number {
        const startA = new Date(`1970-01-01T${a.heure_debut}:00`);
        const startB = new Date(`1970-01-01T${b.heure_debut}:00`);
        return startA.getTime() - startB.getTime();
    }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       properties:
 *         nom_complet:
 *           type: string
 *         nom:
 *           type: string
 *         jour:
 *           type: string
 *         schedule:
 *           type: string
 *         state:
 *           type: string
 *         schedules:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OpenTime'
 *         lat:
 *           type: number
 *         long:
 *           type: number
 *   examples:
 *     Schedule:
 *       value:
 *         nom_complet: Piscine Léo Lagrange Ile Gloriette - Nantes
 *         nom: L. Lagrange
 *         jour: lundi
 *         lat: 47.209857828
 *         long: -1.5600661319999745
 *         schedules: [
 *           {
 *             heure_debut: 12:00,
 *             heure_fin: 20:00
 *           }
 *         ]
 *         state: open
 *         schedule: 12:00-20:00
 *     Schedules:
 *       value:
 *         - nom_complet: Piscine Léo Lagrange Ile Gloriette - Nantes
 *           nom: L. Lagrange
 *           jour: lundi
 *           lat: 47.209857828
 *           long: -1.5600661319999745
 *           schedules: [
 *             {
 *               heure_debut: 12:00,
 *               heure_fin: 20:00
 *             }
 *           ]
 *           state: open
 *           schedule: 12:00-20:00
 */
export default class Schedule {
    nom_complet: string;
    nom: string;
    jour: string;
    schedule: string;
    state: string;
    schedules: OpenTime[];
    lat: number;
    long: number;

    constructor(schedule: ScheduleEntity) {
        this.nom_complet = schedule.nom_complet;
        this.nom = schedule.nom;
        this.jour = schedule.jour;
        this.lat = schedule.wgs_y;
        this.long = schedule.wgs_x;
    }

    isOpen() {
        const currentDate = new Date();

        return this.schedules.some(schedule => {
            return currentDate.getHours() >= parseInt(schedule.heure_debut.split(':')[0]) &&
                currentDate.getHours() < parseInt(schedule.heure_fin.split(':')[0]) ||
                (currentDate.getHours() === parseInt(schedule.heure_fin.split(':')[0]) &&
                    currentDate.getMinutes() < parseInt(schedule.heure_fin.split(':')[1]));
        });
    }
}