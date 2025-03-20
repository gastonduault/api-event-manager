import { Prisma } from "@prisma/client";
import { prisma } from "../prismaClient";

export class TypeRepository {
  static async getTypes() {
    //order by id
    return prisma.type.findMany({
      orderBy: {
        id: Prisma.SortOrder.asc,
      },
    });
  }
  static async getTypeById(id: number) {
    return prisma.type.findUnique({
      where: {
        id,
      },
    });
  }

  static async createType(name: string) {
    return prisma.type.create({
      data: {
        name,
      },
    });
  }

  static async updateType(id: number, data: { name: string }) {
    return prisma.type.update({
      where: {
        id,
      },
      data,
    });
  }

  static async deleteType(id: number) {
    return prisma.type.delete({
      where: {
        id,
      },
    });
  }
}
