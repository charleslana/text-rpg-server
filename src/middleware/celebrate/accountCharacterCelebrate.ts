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