import {database} from '../database';
import {DataTypes} from 'sequelize';
import CharacterClassEnum from '../../enum/CharacterClassEnum';

export const CharacterModel = database.define('tb_character', {
    id: {
        type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true,
    }, characterClass: {
        type: DataTypes.ENUM(...Object.values(CharacterClassEnum)), allowNull: false, field: 'character_class',
    }, description: {
        type: DataTypes.TEXT, allowNull: false,
    }
}, {
    freezeTableName: true, timestamps: false,
});