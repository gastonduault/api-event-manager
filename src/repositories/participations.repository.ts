import { prisma } from "../prismaClient";
import { Participation } from "../entities/participations.entity";

export class ParticipationRepository {
  static async participate(
    userId: number,
    eventId: number,
  ): Promise<Participation> {
    const participation = await prisma.participation.create({
      data: { userId: userId, eventId: eventId },
    });

    return Participation.fromPrisma(participation);
  }

  static async countParticipants(eventId: number) {
    return prisma.participation.count({
      where: { eventId },
    });
  }
}
