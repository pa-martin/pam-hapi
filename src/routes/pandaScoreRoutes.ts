import {Router} from 'express';
import {getNextMatches, getTeamsByName} from '@controllers/pandaScoreController';

const router = Router();

/**
 * @openapi
 * /panda-score/teams:
 *   get:
 *     description: Fetch all the teams by name.
 *     tags:
 *       - PandaScore
 *     parameters:
 *         - in: query
 *           name: teamName
 *           schema:
 *             type: string
 *           required: true
 *     responses:
 *       200:
 *         description: An array of teams.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Team"
 */
router.get('/teams', getTeamsByName);

/**
 * @openapi
 * /panda-score/next-matches:
 *   get:
 *     description: Fetch all the next matches for a team.
 *     tags:
 *       - PandaScore
 *     parameters:
 *         - in: query
 *           name: teamName
 *           schema:
 *             type: string
 *           required: true
 *     responses:
 *       200:
 *         description: An array of next matches.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/NextMatch"
 */
router.get('/next-matches', getNextMatches);

export default router;