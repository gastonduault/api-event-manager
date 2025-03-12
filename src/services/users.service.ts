import { UsersRepository } from "../repositories/users.repository";
import bcrypt from "bcrypt";
import { User } from "../entities/user";

export class UsersService {
  static async createUser(userData: {
    email: string;
    firstname?: string;
    lastname?: string;
    password: string;
  }) {
    const { error } = User.validate(userData);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userWithHashedPassword = { ...userData, password: hashedPassword };

    return await UsersRepository.createUser(userWithHashedPassword);
  }
}
