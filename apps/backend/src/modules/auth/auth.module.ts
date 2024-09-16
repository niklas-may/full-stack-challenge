import { Express } from "express";
import { DepenceyInjection } from "../../lib/dependency-injection";
import { AuthService } from "./auth.service";
import { localGuard } from "./guards/auth.guard.local";
import { sessionGuard } from "./guards/auth.gurad.session";
import { validateRequest } from "../../lib/validate-request";
import { body } from "express-validator";

export function useAuthModule(app: Express, di: DepenceyInjection) {
  const service = new AuthService(di.db);

  app.post("/auth/login", localGuard, (req: any, res: any, next: any) => {
    res.status(200).json(req.session.passport);
  });

  app.get("/auth/logout", async (req: any, res: any, next: any) => {
    req.session.destroy();
    res.status(200).json({});
  });

  app.post(
    "/auth/signup",
    validateRequest([body("email").isEmail(), body("password").isString()]),
    async (req: any, res: any, next: any) => {
      const user = await service.findUserByEmail(req.body.email);
      if (user) {
        res.status(400).json({ message: "User already exists" });
        return;
      }
      await service.createUser(req.body.email);
      res.status(200).json({});
    }
  );

  app.get("/auth/user", sessionGuard, (req: any, res: any, next: any) => {
    res.status(200).json(req.session.passport);
  });
}
