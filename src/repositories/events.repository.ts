import { prisma } from "../prismaClient";
import { Event } from "../entities/events.entity";

export class EventRepository {
  static async getEvents() {
    const events = await prisma.event.findMany();
    return events.map((event) => Event.fromPrisma(event));
  }
}
