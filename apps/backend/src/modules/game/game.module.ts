import { Express } from "express";
import { DepenceyInjection } from "../../lib/dependency-injection";
import { GameService } from "./game.service";
import { sessionGuard } from "../auth/guards/auth.gurad.session";
import { requestUser } from "../auth/utils/request-user";

export function useGameModule(app: Express, di: DepenceyInjection) {
  const service = new GameService(di.db);

  app.get("/game/roll", sessionGuard, async (req: any, res: any, next: any) => {
    const balance = await service.getBalance(requestUser(req));

    if(balance <= 0) {
      return res.status(400).json({message: 'Insufficient balance'});
    }
    const result = await service.rollDice(requestUser(req), balance);

    res.json(result);

  });

  app.post(`/game/cashout`, async (req, res) => {
    // initiate a cashout
  });

  app.get(`/game/accounts/:id`, async (req, res) => {
    // const result = await service.db.account.findFirst({
    //   where: {
    //     id: req.params.id,
    //   },
    // });
    // res.json(result);
  });

  app.post(`/game/accounts`, async (req, res) => {
    // const result = await service.db.account.create({
    //   data: {
    //     ...req.body,
    //   },
    // });
    // res.status(201).json(result);
  });
}
