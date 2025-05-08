import TeamEntity from '@entities/pandaScore/TeamEntity';
import VideoGame from '@models/pandaScore/VideoGame';

/**
 * @openapi
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         acronym:
 *           type: string
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         slug:
 *           type: string
 *         current_videogame:
 *           type: object
 *           $ref: '#/components/schemas/VideoGame'
 *   examples:
 *     Team:
 *       value:
 *         acronym: KC
 *         id: 134078
 *         name: Karmine Corp
 *         slug: karmine-corp-academy
 *         current_videogame:
 *           id: 1
 *           name: LoL
 *           slug: league-of-legends
 *     Teams:
 *       value:
 *         - acronym: KC
 *           id: 134078
 *           name: Karmine Corp
 *           slug: karmine-corp-academy
 *           current_videogame:
 *             id: 1
 *             name: LoL
 *             slug: league-of-legends
 */
export default class Team {
    acronym: string;
    id: number;
    name: string;
    slug: string;
    current_videogame?: VideoGame;

    constructor(team: TeamEntity) {
        this.acronym = team.acronym;
        this.id = team.id;
        this.name = team.name;
        this.slug = team.slug;

        if (team.current_videogame) {
            this.current_videogame = new VideoGame(team.current_videogame);
        }
    }
}
