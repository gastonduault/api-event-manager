import { prisma } from "../prismaClient";
import { User } from "../entities/user";
import { PrismaClient, Prisma } from "@prisma/client";

export class UsersRepository {
  static async createUser(userData: {
    email: string;
    firstname?: string;
    lastname?: string;
    password: string;
  }) {
    try {
      const prismaUser = await prisma.user.create({
        data: {
          email: userData.email,
          firstname: userData.firstname,
          lastname: userData.lastname,
          password: userData.password,
          isAdmin: false,
        },
      });

      return User.fromPrisma(prismaUser);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        // P2002 error code for unit
        throw new Error("Email already exists");
      }
      throw error;
    }
  }
}
