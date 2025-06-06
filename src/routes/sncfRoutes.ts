import {getArrivals} from '@controllers/sncfController';
import {Router} from 'express';

const router = Router();

/**
 * @openapi
 * /sncf/trains:
 *   get:
 *     description: Fetches the list of arrivals from the SNCF API for the next 2 days.
 *     tags:
 *       - Transports
 *     responses:
 *       200:
 *         description: List of Arrivals
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fromNantes:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Arrival"
 *                 toNantes:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Arrival"
 *             examples:
 *               Arrival:
 *                 $ref: "#/components/examples/Arrivals"
 */
router.get('/trains', getArrivals);

export default router;