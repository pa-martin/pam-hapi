import VideoGameEntity from './VideoGameEntity';

export default class TeamEntity {
    acronym: string;
    id: number;
    name: string;
    slug: string;
    current_videogame?: VideoGameEntity;
}
