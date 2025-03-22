import { prisma } from "../prismaClient";
import { User } from "../entities/users.entitie";
import { Prisma } from "@prisma/client";

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

      return User.fromPrismaExternal(prismaUser);
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

  static async updateUser(userId: number, updatedData: any) {
    try {
      const prismaUSer = await prisma.user.update({
        where: { id: userId },
        data: updatedData,
      });

      return User.fromPrismaExternal(prismaUSer);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new Error("User not found");
      }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new Error("Email already exists");
      }
      throw error;
    }
  }
  static async deleteUser(userId: number): Promise<void> {
    try {
      await prisma.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new Error("User not found");
      }
      throw error;
    }
  }

  static async getUsers(
    filters: any,
  ): Promise<{ users: User[]; total: number; page: number; pageSize: number }> {
    const { search, page = "1", pageSize = "10" } = filters;

    const pageNumber = Math.max(1, parseInt(page));
    const pageSizeNumber = parseInt(pageSize);
    const limit =
      pageSizeNumber === -1 ? undefined : Math.max(1, pageSizeNumber);
    const offset = limit ? (pageNumber - 1) * limit : 0;

    const where: any = {};
    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { firstname: { contains: search, mode: "insensitive" } },
        { lastname: { contains: search, mode: "insensitive" } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      take: limit,
      skip: offset,
    });

    const total = await prisma.user.count({ where });

    return {
      users: users.map((user) => User.fromPrismaExternal(user)),
      total,
      page: pageNumber,
      pageSize: pageSizeNumber,
    };
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const prismaUser = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        firstname: true,
        lastname: true,
        isAdmin: true,
      },
    });

    return prismaUser ? User.fromPrismaInternal(prismaUser) : null;
  }

  //getuserbyid
  static async getUserById(userId: number): Promise<User | null> {
    const prismaUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    return prismaUser ? User.fromPrismaExternal(prismaUser) : null;
  }
}
