import { EventRepository } from "../repositories/events.repository";

export class EventService {
  static async getEvents() {
    return await EventRepository.getEvents();
  }
}
