import {NextFunction, Request, Response} from 'express';
import AppError from '../shared/AppError';

const errorMiddleware = (error: AppError, _request: Request, response: Response, next: NextFunction) => {
    const message = error.message || 'Erro interno do servidor';
    const status = error.status || null;
    const statusCode = error.statusCode || 500;
    return response.status(statusCode).json({statusCode, status, message});
};

export default errorMiddleware;