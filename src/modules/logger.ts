import ecsFormat from "@elastic/ecs-pino-format";
import pino from "pino";
import {EnvService} from "@services/envService";

export class Logger {
    private static _: Logger;
    private readonly logger = pino({
        ...ecsFormat(),
        name: 'pino@^10.3.1',
        level: EnvService.instance.get('log.level') ?? 'info',
    });

    public static get instance(): Logger {
        if (!Logger._) {
            Logger._ = new Logger();
        }

        return Logger._;
    }

    getLogger(serviceName: string, level?: string) {
        return this.logger.child({
            serviceName: EnvService.instance.get('elasticsearch.index.base') + serviceName,
            level: level
        });
    }

}