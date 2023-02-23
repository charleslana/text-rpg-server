import IAccount from '../interface/IAccount';
import IAccountCharacter from '../interface/IAccountCharacter';

type DecodeType = {
    iat: number; account: IAccount; character: IAccountCharacter;
};

export default DecodeType;