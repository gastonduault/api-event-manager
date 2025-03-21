import { ParticipationRepository } from "../repositories/participations.repository";
import { EventRepository } from "../repositories/events.repository";
import { UsersRepository } from "../repositories/users.repository";
import { Prisma } from "@prisma/client";

export class ParticipationService {
  static async participate(userId: number, eventId: number) {
    const user = await UsersRepository.getUserById(userId);
    if (!user) {
      throw { status: 404, message: `User ${userId} not found.` };
    }
    const event = await EventRepository.getEventById(eventId);
    if (!event) {
      throw { status: 404, message: `Event ${eventId} not found.` };
    }
    if (!event.isModerate) {
      throw {
        status: 400,
        message: `Participation denied: Event ${eventId} is not moderated.`,
      };
    }
    const currentDate = new Date();
    if (event.startDate < currentDate) {
      throw {
        status: 400,
        message: `Participation denied: Event ${eventId} has already started.`,
      };
    }

    const currentParticipants =
      await ParticipationRepository.countParticipants(eventId);
    if (currentParticipants >= event.maxParticipants) {
      throw {
        status: 400,
        message: `Participation denied: Event ${eventId} is full.`,
      };
    }

    try {
      return await ParticipationRepository.participate(userId, eventId);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw {
          status: 400,
          message: `User ${userId} is already participating in event ${eventId}.`,
        };
      }
      throw {
        status: 500,
        message: `An unexpected error occurred: ${error.message}`,
      };
    }
  }
}
