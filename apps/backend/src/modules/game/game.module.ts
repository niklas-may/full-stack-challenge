import { Express } from "express";
import { DepenceyInjection } from "../../lib/dependency-injection";
import { GameService } from "./game.service";
import { sessionGuard } from "../auth/guards/auth.gurad.session";
import { requestUser } from "../auth/utils/request-user";

export function useGameModule(app: Express, di: DepenceyInjection) {
  const service = new GameService(di.db);

  app.get("/game/roll", sessionGuard, async (req: any, res: any, next: any) => {
    const balance = await service.getBalance(requestUser(req));

    if (balance <= 0) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
    const result = await service.rollDice(requestUser(req), balance);

    res.json(result);
  });
}
