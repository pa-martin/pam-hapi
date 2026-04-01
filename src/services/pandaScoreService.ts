import Match from '@models/pandaScore/Match';
import NextMatch from '@models/pandaScore/NextMatch';
import Team from '@models/pandaScore/Team';
import {PandaScoreRepository} from '@repositories/pandaScoreRepository';
import {Logger} from "@modules/logger";

export class PandaScoreService {
    private readonly repository = new PandaScoreRepository();
    private readonly log = Logger.instance.getLogger('PandaScoreService');

    /**
     * Fetches all the teams by their common name
     * @param teamName - The name of the team to search for
     */
    async getTeamsByName(teamName: string): Promise<Team[]> {
        const query = `search[name]=${teamName}`;
        this.log.debug(`Fetching teams with name '${teamName}' using query '${query}'`);
        return (await this.repository.fetchTeams(query)).map(t => new Team(t));
    }

    /**
     * Fetches all the next matches for a team by its name
     * @param teamName - The name of the team to search for
     */
    async getNextMatchesByTeamName(teamName: string): Promise<NextMatch[]> {
        const teams = await this.getTeamsByName(teamName);
        this.log.debug(`Fetching next matches for ${teams.length} teams with name '${teamName}'`);
        return await Promise.all(teams.map(team => this.getNextMatch(team)));
    }

    /**
     * Fetches all the matches for a team object
     * @param team - The team object to fetch matches for
     * @private
     */
    private async fetchMatches(team: Team): Promise<Match[]> {
        const currentDate = new Date();
        const startDate = `${currentDate.getFullYear()}-01-01`;
        const endDate = `${currentDate.getFullYear()}-12-31`;

        const query = `filter[opponent_id]=${team.id}&range[scheduled_at]=${startDate},${endDate}`;
        this.log.debug(`Fetching matches for team '${team.name}' with query '${query}'`);
        return (await this.repository.fetchMatches(query)).map(m => new Match(m));
    }

    /**
     * Fetches the next match for a team object
     * @param team - The team object to fetch the next match for
     * @private
     */
    private async getNextMatch(team: Team): Promise<NextMatch> {
        const matches = (await this.fetchMatches(team)).sort(Match.compare);
        const nextMatch = matches.find(match => match.scheduled_at > new Date().toISOString());
        this.log.debug(`Fetched ${matches.length} matches for team '${team.name}' and found next match with id '${nextMatch?.id}' scheduled at '${nextMatch?.scheduled_at}'`);
        return new NextMatch(team, nextMatch);
    }
}
