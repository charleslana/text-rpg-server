import ICharacter from "../interface/ICharacter";
import {CharacterModel} from "../database/models/CharacterModel";
import AppError from "../shared/AppError";
import AppStatusEnum from "../enum/AppStatusEnum";

export default class CharacterService {

    public static async getAll(): Promise<ICharacter[]> {
        const findAll = await CharacterModel.findAll();
        findAll.forEach(f => {
            f.setDataValue('characterClassStatus', f.getDataValue('characterClass').replace(' ', '.').toLowerCase());
        });
        return (findAll as ICharacter[]);
    }

    public static async get(id?: number): Promise<ICharacter> {
        const find = (await CharacterModel.findOne({
            where: {
                id: id,
            },
        }));
        if (!find) {
            throw new AppError(AppStatusEnum.CharacterNotFound, 'Personagem não encontrado.', 404);
        }
        find.setDataValue('characterClassStatus', find.getDataValue('characterClass').replace(' ', '.').toLowerCase());
        return (find as ICharacter);
    }
}