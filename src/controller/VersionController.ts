import {NextFunction, Request, Response} from 'express';
import VersionService from '../service/VersionService';
import logger from '../utils/logger';

export default class VersionController {

    public static get(request: Request, response: Response, next: NextFunction) {
        logger.info('Get app version');
        return response
            .status(200)
            .json(VersionService.get());
    }
}