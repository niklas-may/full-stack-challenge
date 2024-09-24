import { GameService } from "./game.service";
import { Face, GameRoll } from "./objects/game.roll.object";
import { GameUser } from "./objects/game.user.object";
import { userDataStub } from "./__test__/stubs/user-data-stub";
import { mockPrisma } from "./__test__/mocks/prisma-mock";

describe("GameService", () => {
  it("Should update Balance correctly", async () => {
    const service = new GameService(mockPrisma());

    const cases = [
      {
        result: [Face.Cherry, Face.Cherry, Face.Cherry, Face.Watermelon],
        balance: 10,
        balanceUpdate: -1,
      },
      {
        result: [Face.Cherry, Face.Cherry, Face.Cherry, Face.Cherry],
        balance: 10,
        balanceUpdate: 9,
      },
    ];

    for (const { result, balance, balanceUpdate } of cases) {
      const game = new GameRoll();
      game.result = result;

      const userData = userDataStub();
      userData.account.balance = balance;
      const user = new GameUser(userData);

      jest.spyOn(service["db"].user, "update").mockImplementation( () => ({account: {balance: 10}}) as any);

      const expectedArgs = {
        where: {
          id: user.data.id,
        },
        data: {
          account: {
            update: {
              balance: {
                increment: balanceUpdate,
              },
            },
          },
        },
        include: {
          account: true,
        },
      };

      service.roll(game, user);
      expect(service["db"].user.update).toHaveBeenCalledWith(expectedArgs);
    }
  });
});
