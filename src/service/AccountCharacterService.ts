import AppSuccess from '../shared/AppSuccess';
import AccountService from './AccountService';
import CharacterService from './CharacterService';
import {AccountCharacterModel} from '../database/models/AccountCharacterModel';
import AppStatusEnum from '../enum/AppStatusEnum';
import {CharacterModel} from '../database/models/CharacterModel';
import AppError from '../shared/AppError';
import IAccountCharacter from '../interface/IAccountCharacter';
import sequelize from 'sequelize';

export default class AccountCharacterService {

    public static async save(accountId: number, character: IAccountCharacter): Promise<AppSuccess> {
        await AccountService.get(accountId);
        await CharacterService.get(character.id);
        const count = await AccountCharacterModel.count({
            where: sequelize.where(sequelize.fn('lower', sequelize.col('name')), sequelize.fn('lower', character.name)),
        });
        if (count) {
            throw new AppError(AppStatusEnum.AccountCharacterNameAlreadyExists, 'Nome já está em uso, tente outro.', 400);
        }
        await AccountCharacterModel.create({
            accountId: accountId, characterId: character.id, name: character.name,
        });
        return new AppSuccess(AppStatusEnum.AccountCharacterCreatedSuccess, 'Personagem criado com sucesso.', 201);
    }

    public static async getAll(accountId: number): Promise<IAccountCharacter[]> {
        return await AccountCharacterModel.findAll({
            where: {
                accountId: accountId,
            }, include: [{
                model: CharacterModel, as: 'character',
            },],
        }) as IAccountCharacter[];
    }

    public static async get(id: number, accountId: number): Promise<IAccountCharacter> {
        const exist = await AccountCharacterModel.findOne({
            where: {
                id: id, accountId: accountId,
            }, include: [{
                model: CharacterModel, as: 'character',
            },],
        }) as IAccountCharacter;
        if (!exist) {
            throw new AppError(AppStatusEnum.AccountCharacterNotFound, 'Personagem da conta não encontrado.', 404);
        }
        return exist;
    }
}