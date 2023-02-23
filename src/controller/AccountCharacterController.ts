import {NextFunction, Request, Response} from 'express';
import AccountCharacterService from '../service/AccountCharacterService';

export default class AccountCharacterController {

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const {characterId, name} = request.body;
            const app = await AccountCharacterService.save(request.account.id, {
                id: characterId, name: name,
            });
            return app.toJSON(response);
        } catch (error) {
            next(error);
        }
    }

    public static async findAll(request: Request, response: Response, next: NextFunction) {
        try {
            return response
                .status(200)
                .json(await AccountCharacterService.getAll(request.account.id));
        } catch (error) {
            next(error);
        }
    }

    public static async findOne(request: Request, response: Response, next: NextFunction) {
        try {
            return response
                .status(200)
                .json(await AccountCharacterService.get(request.session.characterId ?? 0, request.account.id));
        } catch (error) {
            next(error);
        }
    }

    public static async select(request: Request, response: Response, next: NextFunction) {
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
        request.session.characterId = null;
        return response
            .status(200)
            .json();
    }
}