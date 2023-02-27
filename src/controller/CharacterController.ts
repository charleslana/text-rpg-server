import {NextFunction, Request, Response} from 'express';
import CharacterService from '../service/CharacterService';
import logger from '../utils/logger';

export default class CharacterController {

    public static async findAll(_request: Request, response: Response, next: NextFunction) {
        logger.info('Get all characters');
        try {
            return response.status(200).json(await CharacterService.getAll());
        } catch (error) {
            next(error);
        }
    }

    public static async findOne(request: Request, response: Response, next: NextFunction) {
        logger.info(`Get character with id ${request.params.id}`);
        try {
            return response
                .status(200)
                .json(await CharacterService.get(+request.params.id));
        } catch (error) {
            next(error);
        }
    }
}