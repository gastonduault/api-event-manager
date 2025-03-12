import { prisma } from "../prismaClient";
import { Event } from "../entities/events.entity";

export class EventRepository {
  static async getEvents(filters: any): Promise<Event[]> {
    const { status, type, startDate, endDate, date, location } = filters;
    const where: any = {};
    if (status) {
      where.isModerate = status === "moderated";
    }
    if (type) where.type = type;
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

    const events = await prisma.event.findMany({ where });
    return events.map((event) => Event.fromPrisma(event));
  }
}

function formatDates(startDate: string, endDate: string) {
  const start = new Date(startDate);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setUTCHours(23, 59, 59, 999);

  return [start, end];
}
