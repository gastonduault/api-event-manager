import { TypeRepository } from "../repositories/types.repository";

export class TypeService {
  static async getTypes() {
    return TypeRepository.getTypes();
  }

  static async getTypeById(id: number) {
    return TypeRepository.getTypeById(id);
  }

  static async createType(name: string) {
    return TypeRepository.createType(name);
  }

  static async updateType(id: number, data: { name: string }) {
    return TypeRepository.updateType(id, data);
  }

  static async deleteType(id: number) {
    return TypeRepository.deleteType(id);
  }
}
