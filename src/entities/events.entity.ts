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
