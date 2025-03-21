import { Prisma } from "@prisma/client";
import { prisma } from "../prismaClient";
import { Type } from "../entities/types.entity";

export class TypeRepository {
  static async getTypes(filters: any) {
    const { page, pageSize } = filters;
    const pageNumber = Math.max(1, parseInt(page));
    const pageSizeNumber = Math.max(1, parseInt(pageSize));
    const limit = pageSizeNumber;
    const offset = (pageNumber - 1) * pageSizeNumber;

    const types = await prisma.type.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        id: Prisma.SortOrder.asc,
      },
    });
    const total = await prisma.type.count();
    return {
      types: types.map((type) => Type.fromPrisma(type)),
      total,
      page: pageNumber,
      pageSize: pageSizeNumber,
    };
  }

  static async getTypeById(id: number) {
    const type = await prisma.type.findUnique({
      where: {
        id,
      },
    });
    if (!type) {
      return null;
    }
    return Type.fromPrisma(type);
  }

  static async createType(name: string) {
    const newType = await prisma.type.create({
      data: {
        name,
      },
    });
    return Type.fromPrisma(newType);
  }

  static async updateType(id: number, data: { name: string }) {
    const type = await prisma.type.update({
      where: {
        id,
      },
      data,
    });
    return Type.fromPrisma(type);
  }

  static async deleteType(id: number) {
    return prisma.type.delete({
      where: {
        id,
      },
    });
  }

  static async typeExists(name: string) {
    const type = await prisma.type.findFirst({
      where: {
        name,
      },
    });
    return !!type;
  }

  static async isUsedByEvents(id: number) {
    const events = await prisma.event.findMany({
      where: {
        typeId: id,
      },
    });
    return events.length > 0;
  }
}
