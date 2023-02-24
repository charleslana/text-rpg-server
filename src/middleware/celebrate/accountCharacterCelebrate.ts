import {celebrate, Joi, Segments} from 'celebrate';

export const validateAccountCharacterCreate = () => {
    return celebrate({
        [Segments.BODY]: {
            name: Joi.string()
                .pattern(/^[a-zA-ZÀ-ú0-9_]*$/)
                .trim()
                .min(3)
                .max(20)
                .required(), characterId: Joi.number().required(),
        },
    }, {abortEarly: false});
};

export const validateAccountCharacterDistributePoints = () => {
    return celebrate({
        [Segments.BODY]: {
            attribute: Joi.object({
                strength: Joi.number().min(1).max(1000),
                intelligence: Joi.number().min(1).max(1000),
                dexterity: Joi.number().min(1).max(1000),
            }).min(1).required(),
        },
    }, {abortEarly: false});
};