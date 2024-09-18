import { Express, Request } from "express";
import { DepenceyInjection } from "../../lib/dependency-injection";
import { GameService } from "./game.service";
import { sessionGuard } from "../auth/guards/auth.gurad.session";
import { GameUser } from "./objects/game.user.object";
import { GameRoll } from "./objects/game.roll.object";

export function useGameModule(app: Express, { db }: DepenceyInjection) {
  const service = new GameService(db);

  app.get("/game/roll", sessionGuard, async (req: Request, res: any, next: any) => {
    const user = await GameUser.fromRequest(req, { db });
    if (!user.canRoll) return res.status(400).json({ message: "Insufficient balance" });

    const result = await service.roll(new GameRoll(), user);
    res.json(result);
  });
}
