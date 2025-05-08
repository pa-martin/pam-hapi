export default class PoolEntity {
    idobj: number;
    nom_usuel: string;
    nom_complet: string;
    adresse: string;
    commune: string;
    location: {
        lon: number;
        lat: number;
    };
}