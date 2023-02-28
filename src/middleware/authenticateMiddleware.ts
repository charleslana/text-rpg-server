import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import AppError from '../shared/AppError';
import AppStatusEnum from '../enum/AppStatusEnum';
import DecodeType from '../types/DecodeType';
import AccountService from '../service/AccountService';

const handleUnauthorizedError = (next: NextFunction) => {
    const error: AppError = new AppError(AppStatusEnum.AccessDenied, 'Não autorizado.', 401);
    next(error);
};

const authenticateMiddleware = async (request: Request, _response: Response, next: NextFunction) => {
    try {
        const authHeader = request.get('Authorization');
        if (authHeader) {
            const bearer = authHeader.split(' ')[0].toLowerCase();
            const token = authHeader.split(' ')[1];
            if (token && bearer === 'bearer') {
                const decode = jwt.verify(token, process.env.TOKEN_SECRET as string);
                if (decode) {
                    const {account} = decode as DecodeType;
                    const userLogged = await AccountService.getAuth(account.id, account.authToken);
                    if (!userLogged) {
                        return handleUnauthorizedError(next);
                    }
                    request.account = {
                        id: account.id as number, role: account.role as unknown as string,
                    };
                    return next();
                }
                return handleUnauthorizedError(next);
            }
            return handleUnauthorizedError(next);
        }
        return handleUnauthorizedError(next);
    } catch (error) {
        handleUnauthorizedError(next);
    }
};

export default authenticateMiddleware;