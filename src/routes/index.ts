import {Router} from 'express';
import accountRoute from './accountRoute';

const routes = Router();

routes.use('/account', accountRoute);

export default routes;