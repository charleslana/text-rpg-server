import express from 'express';
import ServerController from '../controller/ServerController';

const serverRouter = express.Router();

serverRouter.route('/version').get(ServerController.getVersion);
serverRouter.route('/time').get(ServerController.getTime);

export default serverRouter;