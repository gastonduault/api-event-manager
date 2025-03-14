import Joi from "joi";

export const eventQuerySchema = Joi.object({
  status: Joi.string().valid("moderated").optional(),
  type: Joi.number().integer().optional(),
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date()
    .iso()
    .optional()
    .when("startDate", {
      is: Joi.exist(),
      then: Joi.date().min(Joi.ref("startDate")).messages({
        "date.min": "endDate must be greater than or equal to startDate",
      }),
    }),
  date: Joi.date().iso().optional(),
  location: Joi.string().optional(),
  page: Joi.number().integer().min(1).default(1),
  pageSize: Joi.number().integer().min(1).max(100).default(10),
});

export const eventIdSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "Event ID must be a number",
    "number.integer": "Event ID must be an integer",
    "number.positive": "Event ID must be a positive integer",
  }),
});

export const eventSchema = Joi.object({
  id: Joi.number().integer().positive().optional(),
  name: Joi.string().required(),
  startDate: Joi.date().iso().min("now").required().messages({
    "date.min": "startDate must be today or a future date",
  }),
  endDate: Joi.date()
    .iso()
    .min(Joi.ref("startDate"))
    .allow(null)
    .optional()
    .messages({
      "date.min": "endDate must be greater than or equal to startDate",
    }),
  location: Joi.string().allow(null).optional(),
  maxParticipants: Joi.number().integer().min(1).allow(null).optional(),
  picture: Joi.string().uri().allow(null).optional(),
  isModerate: Joi.boolean().optional(),
  responsableId: Joi.number().integer().required(),
  typeId: Joi.number().integer().required(),
  description: Joi.string().optional(),
});
