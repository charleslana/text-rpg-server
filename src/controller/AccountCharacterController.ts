import {NextFunction, Request, Response} from 'express';
import AccountCharacterService from '../service/AccountCharacterService';
import logger from '../utils/logger';

export default class AccountCharacterController {

    public static async create(request: Request, response: Response, next: NextFunction) {
        logger.info(`Create account character ${JSON.stringify(request.body)}`);
        try {
            const {characterId, name, gender} = request.body;
            const app = await AccountCharacterService.save(request.account.id, {
                id: characterId, name: name, gender: gender,
            });
            return app.toJSON(response);
        } catch (error) {
            next(error);
        }
    }

    public static async findAll(request: Request, response: Response, next: NextFunction) {
        logger.info(`Get all account characters ${request.account.id}`);
        try {
            return response
                .status(200)
                .json(await AccountCharacterService.getAll(request.account.id));
        } catch (error) {
            next(error);
        }
    }

    public static async findOne(request: Request, response: Response, next: NextFunction) {
        logger.info(`Get account character with session id ${request.session.characterId}`);
        try {
            return response
                .status(200)
                .json(await AccountCharacterService.get(request.session.characterId ?? 0, request.account.id));
        } catch (error) {
            next(error);
        }
    }

    public static async select(request: Request, response: Response, next: NextFunction) {
        logger.info(`Select account character with id ${request.params.id}`);
        try {
            const find = await AccountCharacterService.get(+request.params.id, request.account.id);
            request.session.characterId = find.id ?? null;
            return response
                .status(200)
                .json();
        } catch (error) {
            next(error);
        }
    }

    public static async logout(request: Request, response: Response, next: NextFunction) {
        logger.info(`Logout account character ${request.session.characterId}`);
        request.session.characterId = null;
        return response
            .status(200)
            .json();
    }

    public static async distributePoints(request: Request, response: Response, next: NextFunction) {
        logger.info(`Distribute points account character ${JSON.stringify(request.body)}`);
        try {
            const {attribute} = request.body;
            const app = await AccountCharacterService.distributePoints({
                accountId: request.account.id,
                characterId: request.session.characterId ?? 0,
                strength: attribute.strength,
                intelligence: attribute.intelligence,
                dexterity: attribute.dexterity,
            });
            return app.toJSON(response);
        } catch (error) {
            next(error);
        }
    }

    public static async delete(request: Request, response: Response, next: NextFunction) {
        logger.info(`Delete character with id ${request.params.id}`);
        try {
            const {id} = request.params;
            const app = await AccountCharacterService.delete(+id, request.account.id);
            return app.toJSON(response);
        } catch (error) {
            next(error);
        }
    }
}