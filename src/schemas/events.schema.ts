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

export const eventSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  startDate: Joi.date().required(),
  endDate: Joi.date(),
  location: Joi.string(),
  maxParticipants: Joi.number().integer().min(1),
  picture: Joi.string().optional(),
  isModerate: Joi.boolean().required(),
  responsableId: Joi.number().integer().required(),
  typeId: Joi.number().integer().required(),
});
