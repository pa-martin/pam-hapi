import ecsFormat from "@elastic/ecs-pino-format";
import pino from "pino";
import {EnvService} from "@services/envService";
import packageJson from '~~/package.json';

export class Logger {
    private static _: Logger;
    private readonly logger = pino({
        ...ecsFormat(),
        name: `pino@${packageJson.dependencies.pino}`,
        level: EnvService.instance.get('log.level'),
        base: {
            'app.service.tag': EnvService.instance.get('elasticsearch.service.tag'),
            'app.version': packageJson.version,
        }
    });

    public static get instance(): Logger {
        if (!Logger._) {
            Logger._ = new Logger();
        }

        return Logger._;
    }

    getLogger(serviceName: string) {
        return this.logger.child({
            'app.service.name': serviceName
        });
    }

}