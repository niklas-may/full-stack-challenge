import { PrismaClient } from "@prisma/client";
import { AuthUser } from "../auth/utils/request-user";

export class AccountService {
  constructor(public db: PrismaClient) {}

  async getAccount(user: AuthUser) {
    return this.db.account.findFirst({
      where: {
        id: user.accountId,
      },
    });
  }

  async deposit(user: AuthUser) {
    return this.db.account.update({
      where: {
        id: user.accountId,
      },
      data: {
        balance: {
          increment: 10,
        },
      },
    });
  }
}
