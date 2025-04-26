import Pool from "@models/nantes/Pool";
import Schedule, {OpenTime} from "@models/nantes/Schedule";
import {NantesRepository} from "@repositories/nantesRepository";

export class NantesService {
    private readonly repository = new NantesRepository();

    /**
     * Fetches the pools in a given city
     * @param city - The city to fetch pools from
     */
    async getPools(city: string): Promise<Pool[]> {
        const query = `where=commune="${city}"`
        return (await this.repository.fetchPools(query)).map(pe => new Pool(pe))
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
            schedules.push(schedule)
        }

        return schedules;
    }

    /**
     * Fetches the schedules of a specific equipment
     * @param type - The type of equipment (e.g. "Piscine", "Déchèterie", etc.)
     * @param weekday - The weekday to fetch schedules for. Should be in French (e.g. "lundi", "mardi", etc.)
     * @param equipmentName - The name of the equipment
     */
    async getEquipmentSchedules(type: string, weekday: string, equipmentName: string): Promise<Schedule | null> {
        const query = `where=type="${type}"\
        and datefin>date'${new Date().toISOString()}'\
        and jour="${weekday}"\
        and nom="${equipmentName}"`

        const schedules = await this.repository.fetchSchedules(query);

        if (schedules.length === 0) {
            return null;
        }

        const schedule = new Schedule(schedules[0]);
        schedule.schedules = schedules
            .map((schedule): OpenTime => ({heure_debut: schedule.heuredebut, heure_fin: schedule.heurefin,}))
            .sort(OpenTime.compare);
        schedule.state = schedule.isOpen() ? 'open' : 'closed';
        schedule.schedule = schedule.schedules
            .map(openTime => openTime.heure_debut + '-' + openTime.heure_fin)
            .join(' | ');

        return schedule;
    }
}
