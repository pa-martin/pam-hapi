import Schedule from '@models/nantes/Schedule';
import NextMatch from '@models/pandaScore/NextMatch';
import {NantesService} from '@services/nantesService';
import {PandaScoreService} from '@services/pandaScoreService';

export class HaService {
    private readonly nantesService = new NantesService();
    private readonly pandaScoreService = new PandaScoreService();

    /**
     * Get the HA configuration for a given weekday or the current weekday if none is provided and the time is before 22:00. Else, it will fetch the next weekday.
     * @param weekday - The weekday to fetch schedules for. Should be in French (e.g. "lundi", "mardi", etc.)
     */
    async getHaConf(weekday: string): Promise<Record<string, NextMatch | Schedule>> {
        const record: Record<string, NextMatch | Schedule> = {};
        const date = new Date();

        if (!weekday && date.getHours() < 22) {
            weekday = date.toLocaleString('fr-FR', {weekday: 'long'});
        } else if (!weekday) {
            date.setDate(date.getDate() + 1);
            weekday = date.toLocaleString('fr-FR', {weekday: 'long'});
        }

        (await this.nantesService.getPoolsSchedules(weekday, 'nantes'))
            .forEach(pool => record[pool.nom] = pool);

        (await this.pandaScoreService.getNextMatchesByTeamName('karmine'))
            .forEach(nm => record[nm.team_slug] = nm);

        return record;
    }
}
