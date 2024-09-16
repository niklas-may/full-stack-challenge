import { Express } from "express";
import { localGuard } from "./guards/auth.guard.local";
import { sessionGuard } from "./guards/auth.gurad.session";
import { PrismaClient } from "@prisma/client";
import { body } from "express-validator";
import { validateRequest } from "../../lib/validate-request";

export function useAuthRoutes(app: Express, prisma: PrismaClient) {
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
      const user = await prisma.user.findUnique({ where: { email: req.body.email } });
      if (user) {
        res.status(400).json({ message: "User already exists" });
        return;
      }
      await prisma.user.create({
        data: {
          email: req.body.email,
          account: {
            create: {
              balance: 10,
            },
          },
        },
      });
      res.status(200).json({});
    }
  );

  app.get("/auth/user", sessionGuard, (req: any, res: any, next: any) => {
    res.status(200).json(req.session.passport);
  });
}
