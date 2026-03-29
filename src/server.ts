import app from '~/app';
import {config} from '~/config';
import {Logger} from "@modules/logger";

app.listen(config.port, () => {
    const log = Logger.instance.getLogger('Server');
    log.info(`Server running on port ${config.port}`);
    log.debug(`Swagger docs available at http://localhost:${config.port}/api-docs`);
});