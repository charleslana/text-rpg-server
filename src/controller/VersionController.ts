import {NextFunction, Request, Response} from 'express';
import VersionService from '../service/VersionService';

export default class VersionController {

    public static get(request: Request, response: Response, next: NextFunction) {
        return response
            .status(200)
            .json(VersionService.get());
    }
}