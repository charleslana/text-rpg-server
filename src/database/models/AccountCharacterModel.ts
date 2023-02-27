import {database} from '../database';
import {DataTypes} from 'sequelize';
import {CharacterModel} from './CharacterModel';
import {AccountModel} from './AccountModel';
import GenderEnum from '../../enum/GenderEnum';

export const AccountCharacterModel = database.define('tb_account_character', {
    id: {
        type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true,
    }, name: {
        type: DataTypes.STRING(20), allowNull: false, unique: true,
    }, experience: {
        type: DataTypes.BIGINT, allowNull: false, defaultValue: 0,
    }, level: {
        type: DataTypes.INTEGER, allowNull: false, defaultValue: 1,
    }, strength: {
        type: DataTypes.INTEGER, defaultValue: 1,
    }, intelligence: {
        type: DataTypes.INTEGER, defaultValue: 1,
    }, dexterity: {
        type: DataTypes.INTEGER, defaultValue: 1,
    }, pointsLevel: {
        type: DataTypes.INTEGER, field: 'points_level', defaultValue: 10,
    }, alz: {
        type: DataTypes.BIGINT, defaultValue: 2000,
    }, gender: {
        type: DataTypes.ENUM(...Object.values(GenderEnum)), allowNull: false,
    }
    , accountId: {
        type: DataTypes.INTEGER, allowNull: false, onDelete: 'CASCADE', references: {
            model: AccountModel, key: 'id',
        }, field: 'account_id',
    }, characterId: {
        type: DataTypes.INTEGER, allowNull: false, onDelete: 'CASCADE', references: {
            model: CharacterModel, key: 'id',
        }, field: 'character_id',
    },
}, {
    freezeTableName: true, createdAt: 'created_at', updatedAt: 'updated_at',
});

AccountCharacterModel.belongsTo(CharacterModel, {
    as: 'character', foreignKey: 'characterId', targetKey: 'id',
});