import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV ?? 'development',
};

const swaggerConfig = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PAM\'HAPI',
            version: '0.4.0',
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
    apis: ['./src/routes/*.ts', './src/models/**/*.ts'],
};

export {config, swaggerConfig};