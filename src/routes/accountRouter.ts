import express from 'express';
import {validateAccountCreate, validateLogin} from '../middleware/celebrate/accountCelebrate';
import AccountController from '../controller/AccountController';
import authenticateMiddleware from '../middleware/authenticateMiddleware';

const accountRouter = express.Router();

accountRouter.route('/').post(validateAccountCreate(), AccountController.create);

accountRouter.route('/').get(authenticateMiddleware, AccountController.find);

accountRouter.route('/login').post(validateLogin(), AccountController.login);

export default accountRouter;