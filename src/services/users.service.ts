import bcrypt from "bcrypt";
import { User } from "../entities/entities.user";
import { UsersRepository } from "../repositories/users.repository";

export class UsersService {
  static async createUser(userData: {
    email: string;
    firstname?: string;
    lastname?: string;
    password: string;
  }) {
    const { error } = User.validateCreate(userData);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userWithHashedPassword = { ...userData, password: hashedPassword };

    return await UsersRepository.createUser(userWithHashedPassword);
  }

  static async updateUser(userId: number, updatedData: any) {
    const { error } = User.validateUpdate(updatedData);
    if (error) {
      throw new Error(error.details[0].message);
    }
    if (updatedData.password) {
      const hashedPassword = await bcrypt.hash(updatedData.password, 10);
      updatedData = { ...updatedData, password: hashedPassword };
    }

    return await UsersRepository.updateUser(userId, updatedData);
  }

  static async deleteUser(userId: number) {
    return await UsersRepository.deleteUser(userId);
  }

  static async getUsers(filters: any) {
    return await UsersRepository.getUsers(filters);
  }
}
