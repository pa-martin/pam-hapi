import Match from '@models/pandaScore/Match';
import Team from '@models/pandaScore/Team';

/**
 * @openapi
 * components:
 *   schemas:
 *     NextMatch:
 *       type: object
 *       properties:
 *         league_name:
 *           type: string
 *         video_game_name:
 *           type: string
 *         team_name:
 *           type: string
 *         team_slug:
 *           type: string
 *         team_acronym:
 *           type: string
 *         opponent_name:
 *           type: string
 *         start:
 *           type: string
 *           format: date-time
 *         end:
 *           type: string
 *           format: date-time
 *         match_name:
 *           type: string
 *   examples:
 *     NextMatch:
 *       value:
 *         league_name: LEC
 *         video_game_name: LoL
 *         team_name: Karmine Corp
 *         team_slug: karmine-corp-academy
 *         team_acronym: KC
 *         opponent_name: Rogue
 *         start: 2025-05-03T17:00:00.000Z
 *         end: 2025-05-03T20:00:00.000Z
 *         match_name: KC vs RGE
 *     NextMatches:
 *       value:
 *         - league_name: LEC
 *           video_game_name: LoL
 *           team_name: Karmine Corp
 *           team_slug: karmine-corp-academy
 *           team_acronym: KC
 *           opponent_name: Rogue
 *           start: 2025-05-03T17:00:00.000Z
 *           end: 2025-05-03T20:00:00.000Z
 *           match_name: KC vs RGE
 *     EmptyNextMatches:
 *       value:
 *         - league_name: ""
 *           video_game_name: Valorant
 *           team_name: Karmine Corp GC
 *           team_slug: karmine-corp-female
 *           team_acronym: KC
 *           opponent_name: ""
 *           start: null
 *           end: null
 *           match_name: No more matches
 */
export default class NextMatch {
    league_name: string;
    video_game_name: string;
    team_name: string;
    team_slug: string;
    team_acronym: string;
    opponent_name: string;
    start: Date;
    end: Date;
    match_name: string;

    constructor(team: Team, match?: Match) {
        this.league_name = match?.league.name ?? '';
        this.video_game_name = match?.videogame.name ?? team.current_videogame?.name ?? '';
        this.team_name = team.name;
        this.team_slug = team.slug;
        this.team_acronym = team.acronym;
        this.opponent_name = match?.opponents
                .find(opponent => opponent.opponent.id !== team.id)?.opponent.name
            ?? '';
        this.start = new Date(match?.scheduled_at ?? match?.begin_at ?? '');
        this.end = new Date(Date.parse(match?.scheduled_at ?? '') + 3600000 * (match?.number_of_games ?? 1));
        this.match_name = match?.name ?? 'No more matches';
    }
}