export class User {
  constructor(
    public id: string | undefined,
    public username: string,
    public password: string,
    public refreshToken?: string | null,
  ) {}
}
