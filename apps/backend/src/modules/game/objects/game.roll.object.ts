export enum Face {
  Lemon = "lemon",
  Cherry = "cherry",
  Orange = "orange",
  Watermelon = "watermelon",
}

export type GameRollResult = {
  result: Face[];
  isWin: boolean;
  winningFace: Face | null;
  reward: number;
};

export class GameRoll {
  private readonly FACES: Face[] = [Face.Cherry, Face.Lemon, Face.Orange, Face.Watermelon];
  private readonly REWARDS: Record<Face, number> = {
    [Face.Cherry]: 10,
    [Face.Lemon]: 20,
    [Face.Orange]: 30,
    [Face.Watermelon]: 40,
  };

  result: Face[] = [];

  constructor() {
    this.rollAll();
  }

  get isWin() {
    return this.result.every((face) => face === this.result[0]);
  }

  get winningFace() {
    return this.isWin ? this.result[0] : null;
  }

  get reward() {
    return this.winningFace ? this.REWARDS[this.winningFace] : 0;
  }

  toJSON(): GameRollResult {
    return {
      result: this.result,
      isWin: this.isWin,
      winningFace: this.winningFace,
      reward: this.reward,
    };
  }

  private rollAll() {
    for (const _ of this.FACES) {
      this.result.push(this.rollOne());
    }
  }

  private rollOne() {
    const res = Math.floor(Math.random() * this.FACES.length);
    return this.FACES[res];
  }
}
