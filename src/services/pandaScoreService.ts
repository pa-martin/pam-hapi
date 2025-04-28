import Match from "@models/pandaScore/Match";
import NextMatch from "@models/pandaScore/NextMatch";
import Team from "@models/pandaScore/Team";
import {PandaScoreRepository} from "@repositories/pandaScoreRepository";

export class PandaScoreService {
    private readonly repository = new PandaScoreRepository();

    async getTeamsByName(teamName: string): Promise<Team[]> {
        const query = `search[name]=${teamName}`;
        return (await this.repository.fetchTeams(query)).map(t => new Team(t));
    }

    private async fetchMatches(team: Team): Promise<Match[]> {
        const currentDate = new Date();
        const startDate = `${currentDate.getFullYear()}-01-01`;
        const endDate = `${currentDate.getFullYear()}-12-31`;

        const query = `filter[opponent_id]=${team.id}&range[scheduled_at]=${startDate},${endDate}`;
        return (await this.repository.fetchMatches(query)).map(m => new Match(m));
    }

    async getNextMatch(team: Team): Promise<NextMatch> {
        const matches = (await this.fetchMatches(team)).sort(Match.compare);
        const nextMatch = matches.find(match => match.scheduled_at > new Date().toISOString());
        return new NextMatch(team, nextMatch);
    }
}
