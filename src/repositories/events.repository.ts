import { prisma } from "../prismaClient";

export class EventRepository {
  static async getEvents() {
    return await prisma.event.findMany();
  }
}
