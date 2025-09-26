import {getEquipmentSchedules, getPools, getSchedules} from '@controllers/nantesController';
import {Router} from 'express';

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
 *             enum: [Basse-Goulaine, Bouguenais, Carquefou, Couëron, Nantes, Orvault, Rezé, Saint-Herblain, Vertou]
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
 *             examples:
 *               Nantes:
 *                 $ref: "#/components/examples/Pools"
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
 *             enum: [Basse-Goulaine, Bouguenais, Carquefou, Couëron, Nantes, Orvault, Rezé, Saint-Herblain, Vertou]
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
 *             examples:
 *               lundi, Nantes:
 *                 $ref: "#/components/examples/Schedules"
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
 *             enum: [Accueil insertion, Accueil personne agée, Autre, Bibliothèque, CCAS, CLIC, Centre Sociocuturel, Centre de loisirs, Centres Médico Sociaux, Château, Cimetière, Déchèterie, Ecopoint, Elévation, Enclos, Gymnase, Jardins familiaux, Libre, Locaux jeunes, Ludothèque, Mairie annexe, Mairie-Hôtel de Ville, Maison de Quartier, Marché, Mixte, Multi-accueil (crèche), Musée, Médiathèque, Parc, Parents-enfants, Piscine, Police municipale, Pôle de proximité, R.A.M, Restauration, Service municipal, Souterrain, Structure associée NM, Structure associée mairie]
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
 *             examples:
 *               Piscine, lundi, L. Lagrange:
 *                 $ref: "#/components/examples/Schedule"
 */
router.get('/schedule', getEquipmentSchedules);

export default router;