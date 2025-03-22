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

export class ParticipationResponse {
  constructor(
    public id: number | null,
    public firstname: string,
    public lastname: string,
  ) {}

  static fromPrisma(prismaParticipation: any): ParticipationResponse {
    return new ParticipationResponse(
      prismaParticipation?.id ?? null,
      prismaParticipation?.firstname ?? "Anonymous",
      prismaParticipation?.lastname ?? "User",
    );
  }
}
