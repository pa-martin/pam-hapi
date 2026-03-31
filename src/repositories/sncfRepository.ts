import ResponseEntity from '@entities/sncf/ResponseEntity';
import {EnvService} from '@services/envService';
import {Logger} from "@modules/logger";

const BASE_URL = 'https://api.sncf.com/v1/coverage/sncf';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: `${EnvService.instance.get('tokens.sncf')}`,
    },
};

export class SncfRepository {
    private readonly log = Logger.instance.getLogger('SncfRepository');

    /**
     * Fetches the arrivals for the stop area with id 'stop_area:SNCF:87481762' (which corresponds to Le Pouliguen station) with a given query string.
     * @param query - The query string to append to the URL (e.g. "datetime=20240101T120000")
     * @returns A promise that resolves to a ResponseEntity containing the arrivals data
     */
    async getArrivals(query: string): Promise<ResponseEntity> {
        const url = `${BASE_URL}/stop_areas/stop_area%3ASNCF%3A87481762/arrivals?count=100&${query}`;
        return fetch(url, options)
            .catch((error: Error) => {
                throw new Error(`Failed to fetch arrivals with url '${url}': ${error.message}`, {cause: error});
            })
            .then(response => response.json())
            .then(data => {
                if (this.isResponseEntity(data)) {
                    this.log.debug(`Fetched ${(data).arrivals.length} arrivals with url '${url}'`);
                    return data;
                }
                if (JSON.stringify(data).includes('Token absent')) {
                    this.log.error(`Received response from SNCF API: ${JSON.stringify(data)}`);
                    throw new Error('Invalid SNCF API token. Please check your environment variables.');
                }
                throw new TypeError(`Response data is not an instance of ResponseEntity: ${JSON.stringify(data)}`);
            });
    }

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    private isResponseEntity(data: any): data is ResponseEntity {
        return data && Array.isArray(data.arrivals);
    }
}
