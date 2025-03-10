import { prisma } from "../prismaClient";

export class EventRepository {
  static async getEvents() {
    return await prisma.event.findMany();
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
      const data = {
        ...eventData,
        isModerate: false,
      };
      return await prisma.event.create({ data });
    } catch (error) {
      console.error("Prisma Error:", error);
      throw error;
    }
  }
}
