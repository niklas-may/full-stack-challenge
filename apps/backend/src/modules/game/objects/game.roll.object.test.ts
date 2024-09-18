import { Face, GameRoll } from "./game.roll.object";

describe("GameRoll", () => {
  const faceMap: { mathRandom: number; face: string; reward: number }[] = [
    { mathRandom: 0, face: Face.Cherry, reward: 10 },
    { mathRandom: 0.25, face: Face.Lemon, reward: 20 },
    { mathRandom: 0.5, face: Face.Orange, reward: 30 },
    { mathRandom: 0.75, face: Face.Watermelon, reward: 40 },
  ];

  it("Should produce all faces", async () => {
    for (const { mathRandom, face } of faceMap) {
      jest.spyOn(Math, "random").mockImplementation(() => mathRandom);
      const game = new GameRoll();
      expect(game.result[0]).toBe(face);
    }
  });

  it("Should identify a win", () => {
    for (const { mathRandom } of faceMap) {
      jest.spyOn(Math, "random").mockImplementation(() => mathRandom);
      const game = new GameRoll();
      expect(game.isWin).toBe(true);
    }
  });

  it("Should identify the winning face", () => {
    for (const { mathRandom } of faceMap) {
      jest.spyOn(Math, "random").mockImplementation(() => mathRandom);
      const game = new GameRoll();
      expect(game.winningFace).toMatch(faceMap[i].face);
    }
  });

  it("Should return the correct reward", async () => {
    for (const { mathRandom, reward } of faceMap) {
      jest.spyOn(Math, "random").mockImplementation(() => mathRandom);
      const game = new GameRoll();
      expect(game.reward).toBe(reward);
    }
  });
});
