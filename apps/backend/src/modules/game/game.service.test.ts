import { PrismaClient } from "@prisma/client";
import { Face, GameService } from "./game.service";

function createMockPrisma() {
  return {
    user: {
      findUniqueOrThrow: jest.fn(),
      update: jest.fn(),
    },
  } as unknown as PrismaClient;
}

describe("[GameModule]", () => {
  describe("Service:", () => {
    it("Should return all faces randomly", async () => {
      const db = createMockPrisma();
      const service = new GameService(db);

      const cases: { rand: number; face: string }[] = [
        { rand: 0, face: service.FACES[0] },
        { rand: 0.25, face: service.FACES[1] },
        { rand: 0.5, face: service.FACES[2] },
        { rand: 0.75, face: service.FACES[3] },
      ];

      for (const { rand, face } of cases) {
        jest.spyOn(Math, "random").mockImplementation(() => rand);
        expect(service.getRandomFace()).toBe(face);
      }
    });

    it("Should find a winning roll", () => {
      const db = createMockPrisma();
      const service = new GameService(db);

      const cases: { faces: Face[]; expected: null | Face }[] = [
        { faces: service.FACES.map((f) => f), expected: null },
        { faces: service.FACES.map((f) => service.FACES[0]), expected: service.FACES[0] },
      ];

      for (const { faces, expected } of cases) {
        const result = {
          faces,
          balance: 10,
          won: false,
        };
        expect(service.won(result)).toBe(expected);
      }
    });

    it("Should retrun the correct reward", () => {
      const db = createMockPrisma();
      const service = new GameService(db);

      const cases: { face: Face; reward: number }[] = [
        { face: Face.Cherry, reward: 10 },
        { face: Face.Lemon, reward: 20 },
        { face: Face.Orange, reward: 30 },
        { face: Face.Watermelon, reward: 40 },
      ];

      for (const { face, reward } of cases) {
        expect(service.getReward(face)).toBe(reward);
      }
    });

    it("Should create correct retry chance based on balance", async () => {
      const db = createMockPrisma();
      const service = new GameService(db);

      const cases: { balance: number; retryThreshold: number }[] = [
        {
          balance: 30,
          retryThreshold: 0,
        },
        {
          balance: 40,
          retryThreshold: 0.3,
        },
        {
          balance: 60,
          retryThreshold: 0.6,
        },
      ];

      for (const { balance, retryThreshold } of cases) {
        expect(service.getRetryThreshold(balance)).toBe(retryThreshold);
      }
    });
  });
});
