import MatchEntity from '@entities/pandaScore/MatchEntity';
import TeamEntity from '@entities/pandaScore/TeamEntity';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://api.pandascore.co';
const TOKEN = process.env.PANDASCORE_TOKEN ?? '';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${TOKEN}`,
    },
};

export class PandaScoreRepository {

    async fetchTeams(query: string): Promise<TeamEntity[]> {
        const response = await fetch(`${BASE_URL}/teams?${query}`, options);
        return await response.json() as TeamEntity[];
    }

    async fetchMatches(query: string): Promise<MatchEntity[]> {
        const response = await fetch(`${BASE_URL}/matches?${query}`, options);
        return (await response.json() as MatchEntity[]);
    }
}
