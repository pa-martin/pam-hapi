import {EnvService} from '@services/envService';

const env = EnvService.instance;

interface Config {
    port: number;
    nodeEnv: string;
}

const config: Config = {
    port: Number(env.get('application.port')),
    nodeEnv: env.get('application.env'),
};

const swaggerConfig = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PAM\'HAPI',
            version: '0.5.0',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Development server',
            },
            {
                url: 'http://localhost:7001/api/v1',
                description: 'Docker',
            },
            {
                url: 'http://pami-serv:7000/api/v1',
                description: 'HA server (prod)',
            },
            {
                url: 'http://pami-serv:7001/api/v1',
                description: 'HA server (dev)',
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/models/**/*.ts', './src/entities/**/*.ts'],
};

export {config, swaggerConfig};