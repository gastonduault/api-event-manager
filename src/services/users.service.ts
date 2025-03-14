import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entities/entities.user";
import { UsersRepository } from "../repositories/users.repository";

const JWT_SECRET = process.env.JWT_SECRET;

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

    // already exist ?
    let existingUser = await UsersRepository.getUserByEmail(userData.email);
    if (existingUser) {
      // check email and password for returning a token
      const isPasswordValid = await bcrypt.compare(
        userData.password,
        existingUser.password,
      );

      if (!isPasswordValid) {
        const error = new Error("Invalid credentials");
        (error as any).statusCode = 400;
        throw error;
      }

      const token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        JWT_SECRET,
        { expiresIn: "24h" },
      );

      return { user: User.fromPrismaExternal(existingUser), token };
    }

    // new user
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userWithHashedPassword = { ...userData, password: hashedPassword };

    const newUser = await UsersRepository.createUser(userWithHashedPassword);

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "24h" },
    );

    return { user: User.fromPrismaExternal(existingUser), token };
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
