import type { NextPage } from "next";
import { useAuthGuard } from "../../hooks/guards/auth";

const Game: NextPage = () => {
  useAuthGuard()

  return (
    <div>
      <main>Game</main>
    </div>
  );
};

export default Game;
