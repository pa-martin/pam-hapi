import LeagueEntity from '@entities/pandaScore/LeagueEntity';
import MatchEntity from '@entities/pandaScore/MatchEntity';
import PlayerEntity from '@entities/pandaScore/PlayerEntity';
import VideoGameEntity from '@entities/pandaScore/VideoGameEntity';
import Team from '@models/pandaScore/Team';

export default class Match {
    league: LeagueEntity;
    id: number;
    name: string;
    number_of_games: number;
    begin_at: string;
    scheduled_at: string;
    videogame: VideoGameEntity;
    opponents: { opponent: Team | PlayerEntity; type: 'Team' | 'Player' }[];

    constructor(data: Partial<MatchEntity>) {
        this.league = data.league ?? new LeagueEntity();
        this.id = data.id ?? 0;
        this.name = data.name ?? '';
        this.number_of_games = data.number_of_games ?? 0;
        this.begin_at = data.begin_at ?? '';
        this.scheduled_at = data.scheduled_at ?? '';
        this.videogame = data.videogame ?? new VideoGameEntity();
        this.opponents = data.opponents ?? [];
    }

    static compare(a: Match, b: Match): number {
        return Date.parse(a.scheduled_at ?? a.begin_at) - Date.parse(b.scheduled_at ?? b.begin_at);
    }
}
