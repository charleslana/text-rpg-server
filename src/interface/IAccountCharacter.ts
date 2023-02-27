import GenderEnum from '../enum/GenderEnum';

export default interface IAccountCharacter {
    id?: number;
    name?: string;
    experience?: number;
    level?: number;
    strength?: number;
    intelligence?: number;
    dexterity?: number;
    pointsLevel?: number;
    alz?: number;
    gender?: GenderEnum;
}