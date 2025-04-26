import express, {Request, Response} from 'express';
import { errorHandler } from '@middlewares/exceptions.handler';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the RESTful API!');
});

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;