import AppSuccess from '../shared/AppSuccess';
import AccountService from './AccountService';
import CharacterService from './CharacterService';
import {AccountCharacterModel} from '../database/models/AccountCharacterModel';
import AppStatusEnum from '../enum/AppStatusEnum';
import {CharacterModel} from '../database/models/CharacterModel';
import AppError from '../shared/AppError';
import IAccountCharacter from '../interface/IAccountCharacter';
import sequelize from 'sequelize';
import IDistributePoint from '../interface/IDistributePoint';

export default class AccountCharacterService {

    public static async save(accountId: number, character: IAccountCharacter): Promise<AppSuccess> {
        const account = await AccountService.get(accountId);
        await CharacterService.get(character.id);
        await this.validateMaxCharacterExceeded(accountId, account.premiumDate ?? new Date());
        await this.validateNameAlreadyExists(character);
        await AccountCharacterModel.create({
            accountId: accountId, characterId: character.id, name: character.name, gender: character.gender,
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

    public static async distributePoints(i: IDistributePoint): Promise<AppSuccess> {
        const get = await this.get(i.characterId, i.accountId);
        const points = (i.strength ?? 0) + (i.intelligence ?? 0) + (i.dexterity ?? 0);
        if (Number(get.pointsLevel) < points) {
            throw new AppError(AppStatusEnum.AccountCharacterDistributePointsInsufficient, 'Pontos de distribuir insuficiente.');
        }
        await AccountCharacterModel.update({
            strength: sequelize.literal(`strength + ${i.strength ?? 0}`),
            intelligence: sequelize.literal(`intelligence + ${i.intelligence ?? 0}`),
            dexterity: sequelize.literal(`dexterity + ${i.dexterity ?? 0}`),
            pointsLevel: sequelize.literal(`points_level - ${points}`),
        }, {
            where: {
                id: get.id,
            },
        });
        return new AppSuccess(AppStatusEnum.AccountCharacterDistributePointsSuccess, 'Pontos distribuídos com sucesso.');
    }

    public static async delete(characterId: number, accountId: number): Promise<AppSuccess> {
        const get = await this.get(characterId, accountId);
        if (Number(get.level) >= 100) {
            throw new AppError(AppStatusEnum.AccountCharacterDeletedNotAccepted, 'Você não pode remover um personagem com nível 100 ou mais.');
        }
        await AccountCharacterModel.destroy({
            where: {
                id: characterId,
            },
        });
        return new AppSuccess(AppStatusEnum.AccountCharacterDeletedSuccess, 'Personagem excluído com sucesso.');
    }

    private static async validateNameAlreadyExists(character: IAccountCharacter): Promise<void> {
        const count = await AccountCharacterModel.count({
            where: sequelize.where(sequelize.fn('lower', sequelize.col('name')), sequelize.fn('lower', character.name)),
        });
        if (count) {
            throw new AppError(AppStatusEnum.AccountCharacterNameAlreadyExists, 'Nome já está em uso, tente outro.');
        }
    }

    private static async validateMaxCharacterExceeded(accountId: number, premiumDate: Date): Promise<void> {
        const count = await AccountCharacterModel.count({
            where: {
                accountId: accountId
            }
        });
        if (count >= 4 && premiumDate <= new Date()) {
            throw new AppError(AppStatusEnum.AccountCharacterMaxCharacterExceeded, 'Você já atingiu o limite de personagens em sua conta.');
        }
        if (count >= 6) {
            throw new AppError(AppStatusEnum.AccountCharacterMaxCharacterExceeded, 'Você já atingiu o limite de personagens em sua conta.');
        }
    }
}