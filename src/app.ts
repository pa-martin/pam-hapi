import {errorHandler} from '@middlewares/exceptions.handler';
import haRoutes from '@routes/haRoutes';
import nantesRoutes from '@routes/nantesRoutes';
import pandaScoreRoutes from '@routes/pandaScoreRoutes';
import sncfRoutes from '@routes/sncfRoutes';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {swaggerConfig} from '~/config';

const app = express();
const swaggerSpec = swaggerJsdoc(swaggerConfig);

app.use(express.json());

app.use('/api/v1/ha', haRoutes);
app.use('/api/v1/nantes', nantesRoutes);
app.use('/api/v1/panda-score', pandaScoreRoutes);
app.use('/api/v1/sncf', sncfRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;