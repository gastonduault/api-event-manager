export class Type {
  constructor(
    public id: number,
    public name: string,
  ) {}

  static fromPrisma(prismaType: any): Type {
    return new Type(prismaType.id, prismaType.name);
  }
}
