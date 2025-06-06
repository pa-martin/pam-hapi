import Arrival from '@models/sncf/Arrival';
import {SncfRepository} from '@repositories/sncfRepository';

export class SncfService {
    private readonly repository = new SncfRepository();

    /**
     * Fetches the next train arrivals to and from Nantes.
     */
    async getArrivals(): Promise<{ fromNantes: Arrival[], toNantes: Arrival[] }> {
        const now = new Date();
        const query = `duration=${3600 * (48 - now.getHours()) + 60 * (60 - now.getMinutes())}`;
        const res = (await this.repository.getArrivals(query));

        const fromNantes: Arrival[] = [];
        const toNantes: Arrival[] = [];
        res.arrivals.forEach(schedule => {
            const isTGV = schedule.display_informations.commercial_mode.includes('TGV');
            const terminus = schedule.stop_date_time.links[1];

            if (terminus.category === 'terminus' && terminus.id === 'stop_area:SNCF:87481788') {
                fromNantes.push(new Arrival(schedule, isTGV));
            } else {
                toNantes.push(new Arrival(schedule, isTGV));
            }
        });

        return {fromNantes: fromNantes, toNantes: toNantes};
    }
}
