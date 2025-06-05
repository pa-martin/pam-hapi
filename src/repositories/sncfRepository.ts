import ResponseEntity from '@entities/sncf/ResponseEntity';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://api.sncf.com/v1/coverage/sncf';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: `${process.env.SNCF_TOKEN}`,
    },
};

export class SncfRepository {

    /**
     * Fetch teams from PandaScore API
     * @param query - The query string to filter teams following this format:
     * `search[name]=<team_name>`
     */
    async getArrivals(query: string): Promise<ResponseEntity> {
        const url = `${BASE_URL}/stop_areas/stop_area%3ASNCF%3A87481762/arrivals?count=100&${query}`;
        try {
            const response = await fetch(url, options);
            return await response.json() as ResponseEntity;
        } catch (error) {
            console.error(`Error fetching arrivals: ${(error as Error).message}`);
            return new ResponseEntity();
        }
    }
}
