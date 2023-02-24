import express from 'express';
import VersionController from '../controller/VersionController';

const versionRouter = express.Router();

versionRouter.route('/').get(VersionController.get);

export default versionRouter;