import express from 'express';
import CharacterController from '../controller/CharacterController';
import authenticateMiddleware from '../middleware/authenticateMiddleware';
import {validateSetId} from '../middleware/celebrate/commonCelebrate';

const characterRouter = express.Router();

characterRouter.route('/').get(authenticateMiddleware, CharacterController.findAll);

characterRouter.route('/:id').get(validateSetId(), authenticateMiddleware, CharacterController.findOne);

export default characterRouter;