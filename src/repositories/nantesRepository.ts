import ApiReturn from "@entities/nantes/ApiReturn";
import PoolEntity from "@entities/nantes/PoolEntity";
import ScheduleEntity from "@entities/nantes/ScheduleEntity";

const BASE_URL = 'https://data.nantesmetropole.fr';
const POOLS_URL = '/api/explore/v2.1/catalog/datasets/244400404_piscines-nantes-metropole/records'
const SCHEDULE_URL = '/api/explore/v2.1/catalog/datasets/244400404_horaires-equipements-publics-nantes-metropole/records'
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
    }
};

export class NantesRepository {

    async fetchPools(query: string): Promise<PoolEntity[]> {
        const response = await fetch(`${BASE_URL}${POOLS_URL}?${query}`, options);
        return (await response.json() as ApiReturn<PoolEntity>).results;
    }

    async fetchSchedules(query: string): Promise<ScheduleEntity[]> {
        const response = await fetch(`${BASE_URL}${SCHEDULE_URL}?${query}`, options);
        return (await response.json() as ApiReturn<ScheduleEntity>).results;
    }
}
