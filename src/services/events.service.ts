import { EventRepository } from "../repositories/events.repository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class EventService {
  static async getEvents() {
    return await EventRepository.getEvents();
  }

  static async createEvent(eventData: {
    name: string;
    startDate: Date;
    typeId: number;
    responsableId: number;
    description?: string;
    endDate?: Date;
    location?: string;
    maxParticipants?: number;
    picture?: string;
    isModerate: boolean;
  }) {
    return await EventRepository.createEvent(eventData);
  }

  static async getEventById(eventId: number) {
    const event = await EventRepository.getEventById(eventId);
    if (!event) {
      return null;
    }

    return event;
  }
}
