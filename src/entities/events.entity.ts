import Joi from "joi";

export class Event {
  constructor(
    public id: number,
    public name: string,
    public startDate: Date,
    public endDate: Date,
    public location: string,
    public maxParticipants: number,
    public picture: string,
    public isModerate: boolean,
    public responsableId: number,
    public typeId: number,
  ) {}

  static validate(eventData: any) {
    const schema = Joi.object({
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

    return schema.validate(eventData);
  }

  static fromPrisma(prismaEvent: any): Event {
    return new Event(
      prismaEvent.id,
      prismaEvent.name,
      prismaEvent.startDate,
      prismaEvent.endDate,
      prismaEvent.location,
      prismaEvent.maxParticipants,
      prismaEvent.picture,
      prismaEvent.isModerate,
      prismaEvent.responsableId,
      prismaEvent.typeId,
    );
  }
}
