import { userDataStub } from "../__test__/stubs/user-data-stub";
import { GameUser } from "./game.user.object";

describe("[GameUser]", () => {
  const balanceMap: { balance: number; chance: number }[] = [
    { balance: 30, chance: 0 },
    { balance: 40, chance: 0.3 },
    { balance: 60, chance: 0.6 },
  ];

  it("Should produce the correct retry chance", async () => {
    for (const { balance, chance } of balanceMap) {
      const user = new GameUser(userDataStub());
      user.data.account.balance = balance;
      expect(user.retryChance).toBe(chance);
    }
  });

  it("Should identify if the user can roll", async () => {
    const cases: [balance: number, canRoll: boolean][] = [
      [0, false],
      [1, true],
    ];

    for (const [balance, canRoll] of cases) {
      const user = new GameUser(userDataStub());
      user.data.account.balance = balance;
      expect(user.canRoll).toBe(canRoll);
    }
  });
});
