import { prisma } from "../prismaClient";
import { Event } from "../entities/events.entity";

export class EventRepository {
  static async getEvents() {
    const events = await prisma.event.findMany();
    return events.map((event) => Event.fromPrisma(event));
  }

  static async createEvent(eventData: {
    name: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
    location?: string;
    maxParticipants?: number;
    picture?: string;
    responsableId: number;
    typeId: number;
  }) {
    try {
      const prismaEvent = await prisma.event.create({
        data: {
          ...eventData,
          isModerate: false,
        },
      });

      return Event.fromPrisma(prismaEvent);
    } catch (error) {
      console.error("Prisma Error:", error);
      throw error;
    }
  }

  static async getEventById(eventId: number) {
    const prismaEvent = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!prismaEvent) {
      return null;
    }
    return Event.fromPrisma(prismaEvent);
  }

  static async updateEvent(eventId: number, updatedData: any) {
    try {
      const prismaEvent = await prisma.event.update({
        where: { id: eventId },
        data: updatedData,
      });
      return prismaEvent;
    } catch (error) {
      return null;
    }
  }
}
