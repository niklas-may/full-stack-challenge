import { PrismaClient } from "@prisma/client";
import { AuthUser } from "../auth/utils/request-user";

export enum Face {
  Lemon = "lemon",
  Cherry = "cherry",
  Orange = "orange",
  Watermelon = "watermelon",
}

type RollResult = {
  faces: Face[];
  balance: number;
  won: boolean;
};

export class GameService {
  readonly FACES: Face[] = [Face.Cherry, Face.Lemon, Face.Orange, Face.Watermelon];

  constructor(public db: PrismaClient) {}

  async rollDice(authUser: AuthUser, balance: number): Promise<RollResult> {
    const result: RollResult = {
      faces: this.roll(),
      balance,
      won: false,
    };

    const winningSymbol = this.won(result);
    result.won = !!winningSymbol;

    if (result.won && (await this.shouldRetry(balance))) {
      return this.rollDice(authUser, balance);
    }

    const rewared = this.getReward(winningSymbol);
    result.balance = await this.updateBalance(authUser, rewared);

    return result;
  }

  getReward(face: Face | null) {
    if (face === null) return 0;

    const REWARDS: Record<Face, number> = {
      [Face.Cherry]: 10,
      [Face.Lemon]: 20,
      [Face.Orange]: 30,
      [Face.Watermelon]: 40,
    };

    return REWARDS[face];
  }

  roll() {
    const result = [];

    for (const _ of this.FACES) {
      const face = this.getRandomFace();
      result.push(face);
    }

    return result;
  }

  getRandomFace() {
    const res = Math.floor(Math.random() * this.FACES.length);
    return this.FACES[res];
  }

  won({ faces }: RollResult) {
    const same = faces.every((face) => face === faces[0]);
    const result = same ? faces[0] : null;
    return result;
  }

  async shouldRetry(currentBalance: number) {
    const balance = currentBalance - 1;
    const retryThreshold = this.getRetryThreshold(balance);
    const rand = Math.random();
    const retry = rand < retryThreshold;

    return retry;
  }

  getRetryThreshold(balance: number) {
    let retryThreshold = 0;

    if (balance >= 40 && balance < 60) {
      retryThreshold = 0.3;
    }

    if (balance >= 60) {
      retryThreshold = 0.6;
    }

    return retryThreshold
  }

  async updateBalance(authUser: AuthUser, reward: number) {
    const user = await this.db.user.update({
      where: {
        id: authUser.id,
      },
      data: {
        account: {
          update: {
            balance: {
              increment: reward - 1,
            },
          },
        },
      },
      include: {
        account: true,
      },
    });

    return user.account.balance;
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
}
