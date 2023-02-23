import RoleEnum from '../enum/RoleEnum';

export default interface IAuthenticate {
    id?: number;
    accessToken?: string;
    role?: RoleEnum;
    email?: string;
}