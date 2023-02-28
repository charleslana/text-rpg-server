import {NextFunction, Request, Response} from 'express';
import ServerService from '../service/ServerService';
import logger from '../utils/logger';

export default class ServerController {

    public static getVersion(request: Request, response: Response, next: NextFunction) {
        logger.info('Get server version');
        return response
            .status(200)
            .json(ServerService.getVersion());
    }

    public static getTime(request: Request, response: Response, next: NextFunction) {
        logger.info('Get server time');
        return response
            .status(200)
            .json(ServerService.getTime());
    }
}