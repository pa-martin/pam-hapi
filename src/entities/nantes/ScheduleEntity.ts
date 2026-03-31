/**
 * @openapi
 * components:
 *   schemas:
 *     ScheduleEntity:
 *       type: object
 *       properties:
 *         id_lieu:
 *           type: string
 *           description: The unique identifier of the location.
 *         id_obj:
 *           type: integer
 *           description: The unique identifier of the schedule object.
 *         nom_complet:
 *           type: string
 *           description: The full name of the location.
 *         nom:
 *           type: string
 *           description: The short name of the location.
 *         type:
 *           type: string
 *           description: The type of the schedule (e.g. Piscine, Gymnase).
 *         jour:
 *           type: string
 *           description: The day of the week for the schedule (e.g. lundi, mardi).
 *         datedebut:
 *           type: string
 *           format: date
 *           description: The start date of the schedule in YYYY-MM-DD format.
 *         datefin:
 *           type: string
 *           format: date
 *           description: The end date of the schedule in YYYY-MM-DD format.
 *         heuredebut:
 *           type: string
 *           pattern: ^([01]\\d|2[0-3]):([0-5]\\d)$
 *           description: The start time of the schedule in HH:MM format.
 *         heurefin:
 *           type: string
 *           pattern: ^([01]\\d|2[0-3]):([0-5]\\d)$
 *           description: The end time of the schedule in HH:MM format.
 *         wgs_x:
 *           type: number
 *           format: float
 *           description: The WGS 84 longitude coordinate of the location.
 *         wgs_y:
 *           type: number
 *           format: float
 *           description: The WGS 84 latitude coordinate of the location.
 *   examples:
 *     ScheduleEntity:
 *       value:
 *         - id_lieu: E2655,
 *           id_obj: 2655,
 *           nom_complet: Piscine municipale Victor-Jara - Rezé,
 *           theme: Sport et loisirs,
 *           categorie: Salle et terrain de sport,
 *           nom: Victor-Jara,
 *           type: Piscine,
 *           periode: Horaires d'ouverture,
 *           jour: mardi,
 *           datedebut: 2025-01-09,
 *           datefin: 2027-02-28,
 *           heuredebut: 07:00,
 *           heurefin: 08:30,
 *           jour_exception: null,
 *           type_horaire: Ouverture normale,
 *           wgs_x: -1.5687572819999787,
 *           wgs_y: 47.183020580000004,
 *           der_creation: 2025-01-08T09:52:09+00:00,
 *           der_modification: 2025-11-21T19:25:44+00:00,
 *           info_complementaire: null
 */
export default class ScheduleEntity {
    id_lieu: string;
    id_obj: number;
    nom_complet: string;
    nom: string;
    type: string;
    jour: string;
    datedebut: string; // YYYY-MM-DD
    datefin: string;
    heuredebut: string; // HH:MM
    heurefin: string;
    wgs_x: number;
    wgs_y: number;

    constructor(schedule: ScheduleEntity) {
        this.id_lieu = schedule.id_lieu;
        this.id_obj = schedule.id_obj;
        this.nom_complet = schedule.nom_complet;
        this.nom = schedule.nom;
        this.type = schedule.type;
        this.jour = schedule.jour;
        this.datedebut = schedule.datedebut;
        this.datefin = schedule.datefin;
        this.heuredebut = schedule.heuredebut;
        this.heurefin = schedule.heurefin;
        this.wgs_x = schedule.wgs_x;
        this.wgs_y = schedule.wgs_y;
    }
}