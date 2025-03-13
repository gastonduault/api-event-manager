import Joi from "joi";

export const eventQuerySchema = Joi.object({
  status: Joi.string().valid("moderated").optional(),
  type: Joi.number().integer().optional(),
  startDate: Joi.string().isoDate().optional(),
  endDate: Joi.string().isoDate().optional(),
  date: Joi.string().isoDate().optional(),
  location: Joi.string().optional(),
  page: Joi.number().integer().min(1).default(1),
  pageSize: Joi.number().integer().min(1).max(100).default(10),
});
