import Pool from '@models/nantes/Pool';
import Schedule, {OpenTime} from '@models/nantes/Schedule';
import {NantesRepository} from '@repositories/nantesRepository';
import ScheduleEntity from '@entities/nantes/ScheduleEntity';
import {Logger} from "@modules/logger";

export class NantesService {
    private readonly repository = new NantesRepository();
    private readonly log = Logger.instance.getLogger('NantesService');

    /**
     * Fetches the pools in a given city
     * @param city - The city to fetch pools from
     */
    async getPools(city: string): Promise<Pool[]> {
        const query = `where=commune="${city[0].toUpperCase() + city.substring(1).toLowerCase()}"`;
        this.log.debug(`Fetching pools for city '${city}' with query '${query}'`);
        return (await this.repository.fetchPools(query)).map(pe => new Pool(pe));
    }

    /**
     * Fetches the schedules of all pools in a given city
     * @param weekday - The weekday to fetch schedules for. Should be in French (e.g. "lundi", "mardi", etc.)
     * @param city - The city to fetch pools from
     */
    async getPoolsSchedules(weekday: string, city: string): Promise<Schedule[]> {
        const pools = await this.getPools(city);
        const schedules: Schedule[] = [];

        for (const pool of pools) {
            const schedule = await this.getEquipmentSchedules('Piscine', weekday, pool.nom_usuel);
            if (!schedule) continue;
            schedules.push(schedule);
        }

        this.log.debug(`Fetched schedules for ${schedules.length} pools in city '${city}' for weekday '${weekday}'`);
        return schedules;
    }

    /**
     * Fetches the schedules of a specific equipment
     * @param type - The type of equipment (e.g. "Piscine", "Déchèterie", etc.)
     */
    async getEquipmentsByType(type: string): Promise<ScheduleEntity[]> {
        const query = `
            where=type="${type}"
            and datedebut<date'${new Date().toISOString()}'
            and datefin>date'${new Date().toISOString()}'
        `.trim();

        const schedules = await this.repository.fetchSchedules(query);
        const equipments: ScheduleEntity[] = [];
        const seenNomComplet = new Set<string>();
        schedules.forEach(schedule => {
            if (!seenNomComplet.has(schedule.nom_complet)) {
                seenNomComplet.add(schedule.nom_complet);
                equipments.push(schedule);
            }
        });

        this.log.debug(`Fetched ${equipments.length} equipments of type '${type}' with query '${query}'`);
        return equipments;
    }

    /**
     * Fetches the schedules of a specific equipment
     * @param type - The type of equipment (e.g. "Piscine", "Déchèterie", etc.)
     * @param weekday - The weekday to fetch schedules for. Should be in French (e.g. "lundi", "mardi", etc.)
     * @param equipmentName - The name of the equipment
     */
    async getEquipmentSchedules(type: string, weekday: string, equipmentName: string): Promise<Schedule | null> {
        const query = `
            where=type="${type}"
            and datedebut<date'${new Date().toISOString()}'
            and datefin>date'${new Date().toISOString()}'
            and jour="${weekday}"
            and nom="${equipmentName}"
        `.trim();

        const schedules = await this.repository.fetchSchedules(query);

        if (schedules.length === 0) {
            return null;
        }

        const schedule = new Schedule(schedules[0]);
        schedule.schedules = schedules
            .map((schedule): OpenTime => ({heure_debut: schedule.heuredebut, heure_fin: schedule.heurefin}))
            .sort(OpenTime.compare);
        schedule.state = schedule.isOpen() ? 'open' : 'closed';
        schedule.schedule = schedule.schedules
            .map(openTime => openTime.heure_debut + '-' + openTime.heure_fin)
            .join(' | ');

        this.log.debug(`Fetched schedule for equipment '${equipmentName}' of type '${type}' on weekday '${weekday}' with query '${query}'`);
        return schedule;
    }
}
