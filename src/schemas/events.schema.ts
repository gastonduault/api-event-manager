import Joi from "joi";

export const eventQuerySchema = Joi.object({
  status: Joi.string().valid("moderated").optional(),
  type: Joi.number().integer().optional(),
  startDate: Joi.string().isoDate().optional(),
  endDate: Joi.string().isoDate().optional(),
  date: Joi.string().isoDate().optional(),
  location: Joi.string().optional(),
});
