import { EventRepository } from "../repositories/events.repository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class EventService {
  static async getEvents(filters: any) {
    return await EventRepository.getEvents(filters);
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

  static async updateEvent(eventId: number, updatedData: any) {
    const existingEvent = await EventRepository.getEventById(eventId);
    if (!existingEvent) {
      throw new Error("Event not found");
    }

    return EventRepository.updateEvent(eventId, updatedData);
  }
  static async removeEvent(eventId: number) {
    return await EventRepository.removeEvent(eventId);
  }

  static async getParticipations(eventId: number, filters: any) {
    return await EventRepository.getParticipations(eventId, filters);
  }
}
