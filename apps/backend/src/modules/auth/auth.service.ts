import { PrismaClient } from "@prisma/client";

export class AuthService {
  constructor(public db: PrismaClient) {}

  async createUser(email: string) {
    await this.db.user.create({
      data: {
        email: email,
        account: {
          create: {
            balance: 10,
          },
        },
      },
    });
  }

  async findUserByEmail(email: string) {
    const user = await this.db.user.findUnique({ where: { email } });
    return user;
  }
}
