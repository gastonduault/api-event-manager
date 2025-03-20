import Joi from "joi";

export const typeSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
});

export const typeIdSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "Type ID must be a number",
    "number.integer": "Type ID must be an integer",
    "number.positive": "Type ID must be a positive integer",
  }),
});
