import { Account, PrismaClient, User } from "@prisma/client";
import { Request } from "express";
import { requestUser } from "../../auth/utils/request-user";

export type GameUserDi = {
  db: PrismaClient;
};

export type GameUserData = User & {
  account: Account;
};

export class GameUser {
  constructor(public data: GameUserData) {}

  get canRoll() {
    return this.data.account.balance >= 1;
  }

  get balance() {
    return this.data.account.balance;
  }

  get retryChance() {
    let chance = 0;
    if (this.balance >= 40 && this.balance < 60) chance = 0.3;
    if (this.balance >= 60) chance = 0.6;
    return chance;
  }

  static async fromRequest(req: Request, di: GameUserDi) {
    const authUser = requestUser(req);

    const data = await di.db.user.findUniqueOrThrow({
      where: {
        id: authUser.id,
      },
      include: {
        account: true,
      },
    });

    return new GameUser(data);
  }
}
