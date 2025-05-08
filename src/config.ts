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
            version: '0.3.0',
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
                url: 'http://192.168.51.51:7001/api/v1',
                description: 'HA server',
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/models/**/*.ts'],
};

export {config, swaggerConfig};