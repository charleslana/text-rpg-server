import {Router} from 'express';
import accountRoute from './accountRouter';
import characterRouter from './characterRouter';
import accountCharacterRouter from './accountCharacterRouter';
import versionRouter from './versionRouter';

const routes = Router();

routes.use('/version', versionRouter);
routes.use('/account', accountRoute);
routes.use('/character', characterRouter);
routes.use('/account/character', accountCharacterRouter);

export default routes;