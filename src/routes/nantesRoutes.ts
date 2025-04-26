import {Router} from 'express';
import {getEquipmentSchedules, getPools, getSchedules} from '@controllers/nantesController';

const router = Router();

/**
 * @openapi
 * /nantes/pools:
 *   get:
 *     description: Fetch all the pools in a specific city.
 *     tags:
 *       - Nantes Métropole
 *     parameters:
 *         - in: query
 *           name: city
 *           schema:
 *             type: string
 *           required: true
 *     responses:
 *       200:
 *         description: An array of pools.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Pool"
 */
router.get('/pools', getPools);

/**
 * @openapi
 * /nantes/pools/schedules:
 *   get:
 *     description: Fetch all the pools schedules in a specific day depending on the city.
 *     tags:
 *       - Nantes Métropole
 *     parameters:
 *         - in: query
 *           name: weekday
 *           schema:
 *             type: string
 *             enum: [lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche]
 *           required: true
 *         - in: query
 *           name: city
 *           schema:
 *             type: string
 *           required: true
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: "#/components/schemas/Schedule"
 */
router.get('/pools/schedules', getSchedules);

/**
 * @openapi
 * /nantes/schedule:
 *   get:
 *     description: Fetch the schedule of specific equipment in a specific day thanks to its name.
 *     tags:
 *       - Nantes Métropole
 *     parameters:
 *         - in: query
 *           name: type
 *           schema:
 *             type: string
 *           required: true
 *         - in: query
 *           name: weekday
 *           schema:
 *             type: string
 *             enum: [lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche]
 *           required: true
 *         - in: query
 *           name: equipmentName
 *           schema:
 *             type: string
 *           required: true
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Schedule"
 */
router.get('/schedule', getEquipmentSchedules);

export default router;