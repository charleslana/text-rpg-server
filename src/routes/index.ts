import {Router} from 'express';
import accountRoute from './accountRouter';
import characterRouter from './characterRouter';
import accountCharacterRouter from './accountCharacterRouter';

const routes = Router();

routes.use('/account', accountRoute);
routes.use('/character', characterRouter);
routes.use('/account/character', accountCharacterRouter);

export default routes;