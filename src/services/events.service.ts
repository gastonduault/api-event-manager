import { EventRepository } from "../repositories/events.repository";

export class EventService {
  static async getEvents() {
    return await EventRepository.getEvents();
  }

  static async createEvent(eventData: {
    name: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
    location?: string;
    maxParticipants?: number;
    picture?: string;
    isModerate: boolean;
    responsableId: number;
    typeId: number;
  }) {
    return await EventRepository.createEvent(eventData);
  }
}
