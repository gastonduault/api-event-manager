import { EventRepository } from "../repositories/events.repository";

export class EventService {
  static async getEvents(filters: any) {
    return await EventRepository.getEvents(filters);
  }
}
