import {EnvService} from '@services/envService';
import packageJson from "~~/package.json";

const env = EnvService.instance;

interface Config {
    port: number;
    nodeEnv: string;
}

const config: Config = {
    port: Number(env.get('application.port')),
    nodeEnv: env.get('application.env'),
};
const url = () => {
    switch (config.nodeEnv) {
        case 'production':
            return `http://pami-serv:${config.port}/api/v1`;
        case 'development':
        case 'docker':
        default:
            return `http://localhost:${config.port}/api/v1`;
    }
}

const swaggerConfig = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PAM\'HAPI',
            version: packageJson.version,
        },
        servers: [
            {
                url: url(),
                description: 'Url d\'accès',
            }
        ],
    },
    apis: ['./src/routes/*.ts', './src/models/**/*.ts', './src/entities/**/*.ts'],
};

export {config, swaggerConfig};