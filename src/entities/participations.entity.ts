export class Participation {
  constructor(
    public idUser: number,
    public idEvent: number,
  ) {}

  static fromPrisma(prismaParticipation: any): Participation {
    return new Participation(
      prismaParticipation.idUser,
      prismaParticipation.idEvent,
    );
  }
}
