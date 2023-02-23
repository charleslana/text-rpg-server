import IAccount from '../interface/IAccount';
import {AccountModel} from '../database/models/AccountModel';
import AppError from '../shared/AppError';
import AppStatusEnum from '../enum/AppStatusEnum';
import sequelize, {Optional} from 'sequelize';
import bcrypt from 'bcrypt';
import AppSuccess from '../shared/AppSuccess';
import IAuthenticate from '../interface/IAuthenticate';
import RoleEnum from '../enum/RoleEnum';
import {Utils} from '../utils/Utils';
import jwt from 'jsonwebtoken';
import IAccountCharacter from '../interface/IAccountCharacter';

export default class AccountService {

    public static async save(i: IAccount): Promise<AppSuccess> {
        let count = await AccountModel.count({
            where: sequelize.where(sequelize.fn('lower', sequelize.col('user')), sequelize.fn('lower', i.user)),
        });
        if (count) {
            throw new AppError(AppStatusEnum.AccountUserAlreadyExists, 'Nome de usuário já cadastrado.', 400);
        }
        count = await AccountModel.count({
            where: sequelize.where(sequelize.fn('lower', sequelize.col('email')), sequelize.fn('lower', i.email)),
        });
        if (count) {
            throw new AppError(AppStatusEnum.AccountEmailAlreadyExists, 'E-mail já cadastrado.', 400);
        }
        i.password = this.encrypt(i.password as string);
        await AccountModel.create(i as Optional<unknown, never>);
        return new AppSuccess(AppStatusEnum.AccountCreatedSuccess, 'Conta criada com sucesso.', 201);
    }

    public static async get(id: number): Promise<IAccount> {
        const find = (await AccountModel.findOne({
            where: {
                id: id,
            }, attributes: {exclude: ['password', 'authToken']},
        })) as IAccount;
        if (!find) {
            throw new AppError(AppStatusEnum.AccountNotFound, 'Conta não encontrada.', 404);
        }
        return find;
    }

    public static async authenticate(user: string, password: string): Promise<IAuthenticate> {
        const find = (await AccountModel.findOne({
            attributes: ['id', 'user', 'password', 'role'], where: {
                user: user,
            },
        })) as IAccount;
        if (!find) {
            throw new AppError(AppStatusEnum.AccountInvalidCredential, 'Impossível acessar, verifique e tente novamente.', 403);
        }
        if (!this.decrypt(password, find.password as string)) {
            throw new AppError(AppStatusEnum.AccountInvalidCredential, 'Impossível acessar, verifique e tente novamente.', 403);
        }
        if (find.role === RoleEnum.Banned) {
            throw new AppError(AppStatusEnum.AccountBanned, 'Impossível logar, a conta está banida.', 403);
        }
        const userUpdated = await AccountModel.update({
            authToken: Utils.randomString(100),
        }, {
            where: {
                id: find.id,
            }, returning: true,
        });
        find.authToken = userUpdated[1][0].get().authToken;
        const character = {} as IAccountCharacter;
        const token = jwt.sign({account: find, character: character}, process.env.TOKEN_SECRET as string, {
            expiresIn: '1d',
        });
        return {
            accessToken: token,
        };
    }

    public static async getAuth(id?: number, authToken?: string): Promise<IAccount> {
        return (await AccountModel.findOne({
            where: {
                id: id, authToken: authToken,
            },
        })) as IAccount;
    }

    private static encrypt(password: string): string {
        const salt = +(process.env.BCRYPT_SALT as string);
        return bcrypt.hashSync(`${password}${process.env.BCRYPT_PASSWORD}`, salt);
    }

    private static decrypt(password: string, hashPassword: string): boolean {
        return bcrypt.compareSync(`${password}${process.env.BCRYPT_PASSWORD}`, hashPassword);
    }
}