import VideoGameEntity from "@entities/pandaScore/VideoGameEntity";

/**
 * @openapi
 * components:
 *   schemas:
 *     VideoGame:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         slug:
 *           type: string
 *         videogame_id:
 *           type: number
 *           enum: [1, 3, 4, 14, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34]
 */
export default class VideoGame {
    id: number;
    name: string;
    slug: string;
    videogame_id?: 1 | 3 | 4 | 14 | 20 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34;

    constructor(videoGame: VideoGameEntity) {
        this.id = videoGame.id;
        this.name = videoGame.name;
        this.slug = videoGame.slug;
        this.videogame_id = videoGame.videogame_id;
    }
}
