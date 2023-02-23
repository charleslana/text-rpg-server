import RoleEnum from '../enum/RoleEnum';

export default interface IAccount {
    id?: number;
    authToken?: string;
    user?: string;
    password?: string;
    email?: string;
    premiumDate?: Date;
    pointsLogged?: number;
    cash?: number;
    role?: RoleEnum;
}