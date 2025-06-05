import MatchEntity from '@entities/pandaScore/MatchEntity';
import TeamEntity from '@entities/pandaScore/TeamEntity';
import {PandaScoreError} from '@errors/PandaScoreError';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://api.pandascore.co';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${process.env.PANDASCORE_TOKEN}`,
    },
};

export class PandaScoreRepository {

    /**
     * Fetch teams from PandaScore API
     * @param query - The query string to filter teams following this format:
     * `search[name]=<team_name>`
     */
    async fetchTeams(query: string): Promise<TeamEntity[]> {
        const response = await fetch(`${BASE_URL}/teams?${query}`, options);
        return await response.json() as TeamEntity[];
    }

    /**
     * Fetch matches from PandaScore API
     * @param query - The query string to filter matches following this format:
     * `filter[opponent_id]=<team_id>&range[scheduled_at]=<start_date>,<end_date>`
     * @throws {PandaScoreError}
     */
    async fetchMatches(query: string): Promise<MatchEntity[]> {
        const response = await fetch(`${BASE_URL}/matches?${query}`, options);
        if (!response.ok) {
            const body = await response.json() as { error: string, message: string };
            throw new PandaScoreError(body.error, body.message);
        }
        return (await response.json() as MatchEntity[]) ?? [];
    }
}
