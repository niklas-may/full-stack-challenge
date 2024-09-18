import { PrismaClient } from "@prisma/client";
import { GameRoll, GameRollResult } from "./objects/game.roll.object";
import { GameUser } from "./objects/game.user.object";

export class GameService {
  constructor(public db: PrismaClient) {}

  async roll(roll: GameRoll, user: GameUser): Promise<GameRollResult & { balance: number }> {
    if (this.shouldRetry(roll, user)) return this.roll(new GameRoll(), user);
    const balance = await this.updateBalance(roll, user);
    return { ...roll.toJSON(), balance };
  }

  private shouldRetry(game: GameRoll, user: GameUser) {
    if (!game.isWin) return false;

    return Math.random() < user.retryChance;
  }

  private async updateBalance(game: GameRoll, user: GameUser) {
    const reward = game.reward - 1;

    const updatedUser = await this.db.user.update({
      where: {
        id: user.data.id,
      },
      data: {
        account: {
          update: {
            balance: {
              increment: reward,
            },
          },
        },
      },
      include: {
        account: true,
      },
    });
    return updatedUser.account.balance;
  }
}
