import {database} from '../database';
import {DataTypes} from 'sequelize';
import RoleEnum from '../../enum/RoleEnum';

export const AccountModel = database.define('tb_account', {
    id: {
        type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true,
    }, authToken: {
        type: DataTypes.STRING, field: 'auth_token',
    }, user: {
        type: DataTypes.STRING(20), allowNull: false, unique: true,
    }, password: {
        type: DataTypes.STRING, allowNull: false,
    }, email: {
        type: DataTypes.STRING(50), allowNull: false, unique: true,
    }, role: {
        type: DataTypes.ENUM(...Object.values(RoleEnum)), allowNull: false, defaultValue: RoleEnum.User,
    }, premiumDate: {
        type: DataTypes.DATE, allowNull: false, field: 'premium_date', defaultValue: DataTypes.NOW,
    }, pointsLogged: {
        type: DataTypes.INTEGER, allowNull: false, field: 'points_logged', defaultValue: 0,
    }, cash: {
        type: DataTypes.BIGINT, allowNull: false, defaultValue: 1000,
    },
}, {
    freezeTableName: true, createdAt: 'created_at', updatedAt: 'updated_at',
});