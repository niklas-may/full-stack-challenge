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

  async getBalance(authUser: AuthUser) {
    const { account } = await this.db.user.findUniqueOrThrow({
      where: {
        id: authUser.id,
      },
      select: {
        account: {
          select: {
            balance: true,
          },
        },
      },
    });
    return account.balance;
  }

  async cashout(authUser: AuthUser) {
    await this.db.account.update({
      where: {
        id: authUser.accountId,
      },
      data: {
        balance: {
          set: 0,
        },
      },
    });
  }
}
