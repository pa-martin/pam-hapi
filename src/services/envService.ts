import dotenv from 'dotenv';
import pino from "pino";
import ecsFormat from "@elastic/ecs-pino-format";
import packageJson from "~~/package.json";

dotenv.config();

export class EnvService {
    private static _: EnvService;
    private readonly env: NodeJS.ProcessEnv;
    private static readonly log = pino({
        ...ecsFormat(),
        name: `pino@${packageJson.dependencies.pino}`,
        level: process.env['log.level'] ?? 'info',
        base: {
            'app.service.name': 'EnvService',
            'app.service.tag': process.env['elasticsearch.service.tag'],
            'app.version': packageJson.version,
        }
    });

    private constructor() {
        this.env = process.env;
    }

    public static get instance(): EnvService {
        if (!EnvService._) {
            this.log.info('Creating new instance of EnvService');
            EnvService._ = new EnvService();
        }
        this.log.debug('Returning instance of EnvService');
        return EnvService._;
    }

    get(key: string): string {
        key = key.toLowerCase();
        const value = this.env[key];
        let printableValue: string | undefined;

        if (!value) {
            throw new Error(`Environment variable ${key} is not set`);
        } else if (key.includes('key') || key.includes('secret') || key.includes('token')) {
            const charToKeep = Math.min(value.length / 3, 4);
            printableValue = `${value.substring(0, charToKeep)}...${value.substring(value.length - charToKeep)}"`;
        }

        EnvService.log.debug(`Environment variable '${key}' is defined with value '${printableValue ?? value}'`);
        return value;
    }

}