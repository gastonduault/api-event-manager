import Joi from "joi";

export class Event {
  constructor(
    public id: number,
    public name: string,
    public startDate: Date,
    public typeId: number,
    public responsableId: number,
    public endDate: Date,
    public location: string,
    public maxParticipants: number,
    public picture: string,
    public isModerate: boolean,
  ) {}

  static validate(eventData: any) {
    if (eventData.isModerate === undefined) {
      eventData.isModerate = false;
    }

    const schema = Joi.object({
      name: Joi.string().required(),
      startDate: Joi.date().iso().min("now").required().messages({
        "date.min": "startDate must be today or a future date",
      }),
      typeId: Joi.number().integer().required(),
      responsableId: Joi.number().integer().required(),
      description: Joi.string().optional(),
      endDate: Joi.date()
        .iso()
        .min(Joi.ref("startDate"))
        .messages({
          "date.min": "endDate must be greater than or equal to startDate",
        })
        .optional(),
      location: Joi.string().optional(),
      maxParticipants: Joi.number().integer().min(1).optional(),
      picture: Joi.string().optional(),
      isModerate: Joi.boolean().required(),
    });

    return schema.validate(eventData);
  }

  static fromPrisma(prismaEvent: any): Event {
    return new Event(
      prismaEvent.id,
      prismaEvent.name,
      prismaEvent.startDate,
      prismaEvent.typeId,
      prismaEvent.responsableId,
      prismaEvent.endDate,
      prismaEvent.location,
      prismaEvent.maxParticipants,
      prismaEvent.picture,
      prismaEvent.isModerate,
    );
  }
}
