export interface GameRoll {
  result: Face[];
  isWin: boolean;
  winningFace: Face | null;
  reward: number;
  balance: number;
}

export enum Face {
  Lemon = "lemon",
  Cherry = "cherry",
  Orange = "orange",
  Watermelon = "watermelon",
}
