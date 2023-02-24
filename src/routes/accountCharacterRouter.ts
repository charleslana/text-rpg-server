import express from 'express';
import {
    validateAccountCharacterCreate,
    validateAccountCharacterDistributePoints
} from '../middleware/celebrate/accountCharacterCelebrate';
import authenticateMiddleware from '../middleware/authenticateMiddleware';
import AccountCharacterController from '../controller/AccountCharacterController';
import {validateSetId} from '../middleware/celebrate/commonCelebrate';

const accountCharacterRouter = express.Router();

accountCharacterRouter
    .route('/')
    .post(validateAccountCharacterCreate(), authenticateMiddleware, AccountCharacterController.create);

accountCharacterRouter
    .route('/')
    .get(authenticateMiddleware, AccountCharacterController.findAll);

accountCharacterRouter
    .route('/detail')
    .get(authenticateMiddleware, AccountCharacterController.findOne);

accountCharacterRouter
    .route('/select/:id')
    .get(validateSetId(), authenticateMiddleware, AccountCharacterController.select);

accountCharacterRouter
    .route('/logout')
    .get(authenticateMiddleware, AccountCharacterController.logout);

accountCharacterRouter
    .route('/distribute-points')
    .post(validateAccountCharacterDistributePoints(), authenticateMiddleware, AccountCharacterController.distributePoints);

export default accountCharacterRouter;