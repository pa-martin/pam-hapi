import PoolEntity from '@entities/nantes/PoolEntity';

/**
 * @openapi
 * components:
 *   schemas:
 *     Pool:
 *       type: object
 *       properties:
 *         idobj:
 *           type: integer
 *         nom_usuel:
 *           type: string
 *         nom_complet:
 *           type: string
 *         adresse:
 *           type: string
 *         commune:
 *           type: string
 *         location:
 *           type: object
 *           properties:
 *             lon:
 *               type: number
 *             lat:
 *                type: number
 *   examples:
 *     Pool:
 *       value:
 *         idobj: 114
 *         nom_usuel: L. Lagrange
 *         nom_complet: Piscine Léo Lagrange Ile Gloriette - Nantes
 *         adresse: Rue Deurbroucq
 *         commune: Nantes
 *         location: {
 *           lon: -1.5600661319999745,
 *           lat: 47.209857828
 *         }
 *     Pools:
 *       value:
 *         - idobj: 114
 *           nom_usuel: L. Lagrange
 *           nom_complet: Piscine Léo Lagrange Ile Gloriette - Nantes
 *           adresse: Rue Deurbroucq
 *           commune: Nantes
 *           location: {
 *             lon: -1.5600661319999745,
 *             lat: 47.209857828
 *           }
 */
export default class Pool {
    idobj: number;
    nom_usuel: string;
    nom_complet: string;
    adresse: string;
    commune: string;
    location: {
        lon: number;
        lat: number;
    };

    constructor(pool: PoolEntity) {
        this.idobj = pool.idobj;
        this.nom_usuel = pool.nom_usuel;
        this.nom_complet = pool.nom_complet;
        this.adresse = pool.adresse;
        this.commune = pool.commune;
        this.location = {
            lon: pool.location.lon,
            lat: pool.location.lat,
        };
    }
}