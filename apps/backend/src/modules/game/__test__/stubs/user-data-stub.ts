import { GameUserData } from "../../objects/game.user.object";

export function userDataStub() {
  return {
    account: {
      balance: 0,
    },
  } as GameUserData;
}
