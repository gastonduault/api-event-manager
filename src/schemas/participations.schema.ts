import Joi from "joi";

export const participationSchema = Joi.object({
  idUser: Joi.number().integer().positive().required(),
  idEvent: Joi.number().integer().positive().required(),
});
