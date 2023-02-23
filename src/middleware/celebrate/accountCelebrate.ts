import {celebrate, Joi, Segments} from 'celebrate';

export const validateAccountCreate = () => {
    return celebrate({
        [Segments.BODY]: {
            user: Joi.string()
                .pattern(/^[a-zA-ZÀ-ú0-9_]*$/)
                .trim()
                .min(3)
                .max(20)
                .required(), password: Joi.string().required().min(6).max(50), passwordConfirmation: Joi.string()
                .valid(Joi.ref('password'))
                .when('password', {
                    is: Joi.exist(), then: Joi.required(),
                }), email: Joi.string().email().trim().max(50).required(),
        },
    }, {abortEarly: false});
};

export const validateLogin = () => {
    return celebrate({
        [Segments.BODY]: {
            user: Joi.string().trim().required(), password: Joi.string().required(),
        },
    }, {abortEarly: false});
};