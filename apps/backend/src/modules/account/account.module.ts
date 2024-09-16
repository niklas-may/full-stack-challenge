import { Express } from "express";
import { DepenceyInjection } from "../../lib/dependency-injection";
import { sessionGuard } from "../auth/guards/auth.gurad.session";
import { requestUser } from "../auth/utils/request-user";
import { AccountService } from "./account.service";

export function useAccountModule(app: Express, di: DepenceyInjection) {
  const service = new AccountService(di.db);

  app.get("/account", sessionGuard, async (req: any, res: any, next: any) => {
    const result = await service.getAccount(requestUser(req));

    res.json(result);
  });

  app.get("/account/deposit", sessionGuard, async (req: any, res: any, next: any) => {
    const result = await service.deposit(requestUser(req));

    res.json(result);
  });

  app.get(`/account/cashout`, sessionGuard, async (req, res) => {
    // initiate a cashout
  });
}
