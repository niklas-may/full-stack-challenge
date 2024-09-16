export interface GameRoll {
  faces: Face[];
  balance: number;
  won: boolean
}

export enum Face {
  Lemon = "lemon",
  Cherry = "cherry",
  Orange = "orange",
  Watermelon = "watermelon",
}
