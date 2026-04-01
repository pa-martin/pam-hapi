import MatchEntity from '@entities/pandaScore/MatchEntity';
import TeamEntity from '@entities/pandaScore/TeamEntity';
import {PandaScoreError} from '@errors/PandaScoreError';
import {EnvService} from '@services/envService';

const BASE_URL = 'https://api.pandascore.co';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${EnvService.instance.get('tokens.pandaScore')}`,
    },
};

export class PandaScoreRepository {

    /**
     * Fetch teams from PandaScore API
     * @param query - The query string to filter teams following this format:
     * `search[name]=<team_name>`
     */
    async fetchTeams(query: string): Promise<TeamEntity[]> {
        return fetch(`${BASE_URL}/teams?${query}`, options)
            .catch((error: Error) => {
                const err = error as PandaScoreError;
                err.thrownBy = `fetchTeams(${query})`;
                err.reason = 'fetch failed'
                throw err;
            })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    return data as TeamEntity[];
                }
                if (JSON.stringify(data).includes('Invalid credentials')) {
                    const err = new PandaScoreError('InvalidToken', `fetchTeams(${query})`);
                    err.message = `Received response from PandaScore API: ${JSON.stringify(data)}. Please check your environment variables.`;
                    err.status = 503;
                    throw err;
                }
                const err = new PandaScoreError('UnexpectedResponse', `fetchTeams(${query})`);
                err.message = `Response data is not an array of TeamEntity: ${JSON.stringify(data)}`;
                throw err;
            });
    }

    /**
     * Fetch matches from PandaScore API
     * @param query - The query string to filter matches following this format:
     * `filter[opponent_id]=<team_id>&range[scheduled_at]=<start_date>,<end_date>`
     * @throws {PandaScoreError}
     */
    async fetchMatches(query: string): Promise<MatchEntity[]> {
        return fetch(`${BASE_URL}/matches?${query}`, options)
            .catch((error: Error) => {
                const err = error as PandaScoreError;
                err.thrownBy = `fetchMatches(${query})`;
                err.reason = 'fetch failed'
                throw err;
            })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    return data as MatchEntity[];
                }
                if (JSON.stringify(data).includes('Invalid credentials')) {
                    const err = new PandaScoreError('InvalidToken', `fetchMatches(${query})`);
                    err.message = `Received response from PandaScore API: ${JSON.stringify(data)}. Please check your environment variables.`;
                    err.status = 503;
                    throw err;
                }
                const err = new PandaScoreError('UnexpectedResponse', `fetchMatches(${query})`);
                err.message = `Response data is not an array of TeamEntity: ${JSON.stringify(data)}`;
                throw err;
            });
    }
}
