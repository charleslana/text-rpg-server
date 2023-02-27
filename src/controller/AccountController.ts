import {NextFunction, Request, Response} from 'express';
import AccountService from '../service/AccountService';
import logger from '../utils/logger';

export default class AccountController {

    public static async create(request: Request, response: Response, next: NextFunction) {
        logger.info(`Create account with user ${JSON.stringify(request.body.user)}`);
        try {
            const {user, password, email} = request.body;
            const app = await AccountService.save({
                user, password, email,
            });
            return app.toJSON(response);
        } catch (error) {
            next(error);
        }
    }

    public static async find(request: Request, response: Response, next: NextFunction) {
        logger.info(`Get account data ${request.account.id}`);
        try {
            return response.status(200).json(await AccountService.get(request.account.id));
        } catch (error) {
            next(error);
        }
    }

    public static async login(request: Request, response: Response, next: NextFunction) {
        logger.info(`Authenticate account with user ${request.body.user}`);
        try {
            const {user, password} = request.body;
            return response
                .status(200)
                .json(await AccountService.authenticate(user, password));
        } catch (error) {
            next(error);
        }
    }
}