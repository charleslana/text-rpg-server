import {NextFunction, Request, Response} from 'express';
import AppError from '../shared/AppError';
import AppStatusEnum from '../enum/AppStatusEnum';

const roleMiddleware = (roles: string[] = []) => {
    return [(request: Request, _response: Response, next: NextFunction) => {
        if (roles.length && !roles.includes(request.account.role)) {
            const error: AppError = new AppError(AppStatusEnum.AccessDenied, 'Não autorizado.', 401);
            return next(error);
        }
        return next();
    },];
};

export default roleMiddleware;