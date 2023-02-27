import express, {Request, Response} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import {errors} from 'celebrate';
import errorMiddleware from './middleware/errorMiddleware';
import AppSuccess from './shared/AppSuccess';
import AppStatusEnum from './enum/AppStatusEnum';
import {database} from './database/database';
import session from 'express-session';
import logger from './utils/logger';

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(session({secret: process.env.SESSION_SECRET as string, resave: true, saveUninitialized: true}));

app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 5 minutes',
}));

app.use(routes);

app.use(errors());

app.use(errorMiddleware);

app.use((request: Request, response: Response) => {
    logger.info(`Route ${request.url} not found`);
    return new AppSuccess(AppStatusEnum.RouteNotFound, 'Rota não encontrada', 404).toJSON(response);
});

const port = process.env.PORT || 5000;

app.listen(port, async () => {
    await database.sync();
    console.log(`Started on port ${port}`);
});