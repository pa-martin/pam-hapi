import {getHaConf} from '@controllers/haController';
import {Router} from 'express';

const router = Router();

/**
 * @openapi
 * /ha/conf:
 *   get:
 *     description: Get all datas for the HA sensors.
 *     tags:
 *       - Home Assistant
 *     parameters:
 *         - in: query
 *           name: weekday
 *           schema:
 *             type: string
 *             enum: [lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche]
 *           required: false
 *     responses:
 *       200:
 *         description: A record of NextMatch and Schedules.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 oneOf:
 *                 - $ref: "#/components/schemas/Schedule"
 *                 - $ref: "#/components/schemas/NextMatch"
 *             examples:
 *               lundi:
 *                 $ref: "#/components/examples/HaConf"
 *       500:
 *         description: A timeout can occur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: fetch failed
 */
router.get('/config', getHaConf);

export default router;