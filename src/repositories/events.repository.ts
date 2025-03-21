import { prisma } from "../prismaClient";
import { Event } from "../entities/events.entity";

export class EventRepository {
  static async getEvents(filters: any): Promise<{
    events: Event[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    const {
      status,
      type,
      startDate,
      endDate,
      date,
      location,
      page = "1",
      pageSize = "10",
    } = filters;

    // Pagination
    const pageNumber = Math.max(1, parseInt(page));
    const pageSizeNumber = Math.max(1, parseInt(pageSize));
    const limit = pageSizeNumber;
    const offset = (pageNumber - 1) * pageSizeNumber;

    const where: any = {};
    if (status) {
      where.isModerate = status === "moderated";
    }
    if (type) where.typeId = type;
    if (startDate && !endDate) {
      const start = formatDates(startDate, endDate)[0];
      where.startDate = { gte: new Date(start) };
    }
    if (!startDate && endDate) {
      const end = formatDates(startDate, endDate)[1];
      where.OR = [
        { startDate: { lte: new Date(end) } },
        { endDate: { lte: new Date(end) } },
      ];
    }
    if (startDate && endDate) {
      const start = formatDates(startDate, endDate)[0];
      const end = formatDates(startDate, endDate)[1];

      where.OR = [
        { startDate: { gte: start, lte: end } }, // Commence dans la période
        { endDate: { gte: start, lte: end } }, // Termine dans la période
        { startDate: { lte: start }, endDate: { gte: end } }, // Englobe toute la période
      ];
    }
    if (date) {
      const dateOnly = formatDates(date, date)[0];

      const nextDay = new Date(dateOnly);
      nextDay.setUTCDate(dateOnly.getUTCDate() + 1); // Prend le jour suivant

      where.OR = [
        {
          startDate: { gte: dateOnly, lt: nextDay },
          endDate: null,
        },
        {
          startDate: { lt: nextDay },
          endDate: { gte: dateOnly },
        },
      ];
    }
    if (location) where.location = location;

    const events = await prisma.event.findMany({
      where,
      take: limit,
      skip: offset,
    });
    const total = await prisma.event.count({ where });
    return {
      events: events.map((event) => Event.fromPrisma(event)),
      total,
      page: pageNumber,
      pageSize: pageSizeNumber,
    };
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
          isModerate: true,
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
      return await prisma.event.update({
        where: { id: eventId },
        data: updatedData,
      });
    } catch (error) {
      return null;
    }
  }
  static async removeEvent(eventId: number) {
    try {
      await prisma.event.delete({
        where: { id: eventId },
      });
    } catch (error) {
      console.error("Prisma Error:", error);
      throw error;
    }
  }
  static async getParticipations(eventId: number) {
    const participations = await prisma.participation.findMany({
      where: {
        eventId,
      },
      select: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
      },
    });

    return participations.map((participation) => participation.user);
  }
}

function formatDates(startDate: string, endDate: string) {
  const start = new Date(startDate);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setUTCHours(23, 59, 59, 999);

  return [start, end];
}
