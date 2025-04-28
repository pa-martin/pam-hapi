import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {errorHandler} from '@middlewares/exceptions.handler';
import nantesRoutes from "@routes/nantesRoutes";
import pandaScoreRoutes from "@routes/pandaScoreRoutes";
import {swaggerConfig} from "~/config";

const app = express();
const swaggerSpec = swaggerJsdoc(swaggerConfig);

app.use(express.json());

app.use('/api/v1/nantes', nantesRoutes);
app.use('/api/v1/panda-score', pandaScoreRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;