import Joi from "joi";

export class User {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public firstname: string,
    public lastname: string,
    public isAdmin: boolean,
  ) {}

  static validateCreate(userData: any) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
    });

    return schema.validate(userData);
  }

  static validateUpdate(userData: any) {
    const schema = Joi.object({
      email: Joi.string().email().optional(),
      password: Joi.string().optional(),
      firstname: Joi.string().optional(),
      lastname: Joi.string().optional(),
    }).or("email", "password", "firstname", "lastname");

    return schema.validate(userData);
  }

  static fromPrismaInternal(prismaUser: any): User {
    return new User(
      prismaUser.id,
      prismaUser.email,
      prismaUser.password,
      prismaUser.firstname,
      prismaUser.lastname,
      prismaUser.isAdmin,
    );
  }

  static fromPrismaExternal(prismaUser: any): User {
    return new User(
      prismaUser.id,
      prismaUser.email,
      "",
      prismaUser.firstname,
      prismaUser.lastname,
      prismaUser.isAdmin,
    );
  }

  static paramsFilter(filters: any) {
    const schema = Joi.object({
      search: Joi.string().optional(),
      page: Joi.number().integer().min(1).optional().default(1),
      pageSize: Joi.number().integer().min(-1).optional().default(10),
    });

    return schema.validate(filters);
  }

  getPassword(): string | undefined {
    return this.password;
  }
}
