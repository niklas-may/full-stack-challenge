import { PrismaClient } from "@prisma/client";
import { AuthUser } from "../auth/utils/request-user";

enum Face {
  Lemon = "lemon",
  Cherry = "cherry",
  Orange = "orange",
  Watermelon = "watermelon",
}

const FACES: Face[] = [Face.Cherry, Face.Lemon, Face.Orange, Face.Watermelon];
const REWARDS: Record<Face, number> = {
  [Face.Cherry]: 10,
  [Face.Lemon]: 20,
  [Face.Orange]: 30,
  [Face.Watermelon]: 40,
};

type RollResult = {
  faces: Face[];
  balance: number;
  won: boolean
};

export class GameService {
  private readonly FACES = FACES;
  private readonly REWARDS = REWARDS;

  constructor(public db: PrismaClient) {}

  async rollDice(authUser: AuthUser, balance: number): Promise<RollResult> {
    const result: RollResult = {
      faces: this.roll(),
      balance,
      won: false
    };

    // result.faces = [Face.Cherry, Face.Cherry, Face.Cherry, Face.Cherry];
    const winningSymbol = this.won(result);
    result.won = !!winningSymbol;

    if (result.won && (await this.shouldRetry(authUser))) {
      return this.rollDice(authUser,  balance);
    }

    const rewared = winningSymbol ? REWARDS[winningSymbol] : 0;
    result.balance = await this.updateBalance(authUser, rewared);

    return result;
  }

  private roll() {
    const result = [];

    for (const _ of this.FACES) {
      const face = this.FACES[Math.floor(Math.random() * this.FACES.length + 0)];
      result.push(face);
    }

    return result;
  }

  private won({ faces }: RollResult) {
    const same = faces.every((face) => face === faces[0]);
    const result = same ? faces[0] : null;
    return result;
  }

  private async shouldRetry(authUser: AuthUser) {
    const user = await this.db.user.findUniqueOrThrow({
      where: {
        id: authUser.id,
      },
      include: {
        account: true,
      },
    });
    const { balance } = user.account;

    let retryThreshold = 0;

    if (balance >= 40 && balance < 60) {
      retryThreshold = 0.3;
    }

    if (balance >= 60) {
      retryThreshold = 0.6;
    }

    const retry = Math.random() < retryThreshold;

    return retry;
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
