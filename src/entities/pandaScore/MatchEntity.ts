import LeagueEntity from './LeagueEntity';
import PlayerEntity from './PlayerEntity';
import TeamEntity from './TeamEntity';
import VideoGameEntity from './VideoGameEntity';

export default class MatchEntity {
    league: LeagueEntity;
    id: number;
    name: string;
    number_of_games: number;
    begin_at: string;
    scheduled_at: string;
    videogame: VideoGameEntity;
    opponents: { opponent: TeamEntity | PlayerEntity; type: 'Team' | 'Player' }[];
}
