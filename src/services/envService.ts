import dotenv from 'dotenv';
import pino from "pino";
import ecsFormat from "@elastic/ecs-pino-format";

dotenv.config();

export class EnvService {
    private static _: EnvService;
    private readonly env: NodeJS.ProcessEnv;
    private static readonly log = pino({
        ...ecsFormat(),
        name: 'pino@^10.3.1',
        level: process.env['log.level'] ?? 'info',
    }).child({serviceName: process.env['elasticsearch.index.base'] + 'EnvService'});

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
            printableValue = `${value.substring(0, 4)}...${value.substring(value.length - 4)}"`;
        }

        EnvService.log.debug(`Environment variable '${key}' is defined with value '${printableValue ?? value}'`);
        return value;
    }

}