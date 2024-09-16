import { Express } from "express";
import { localGuard } from "../auth/guards/auth.guard.local";
import { sessionGuard } from "../auth/guards/auth.gurad.session";
import { PrismaClient } from "@prisma/client";

export function useGameRoutes(app: Express, prisma: PrismaClient) {
  app.post(`/game/cashout`, async (req, res) => {
    // initiate a cashout
  });

  app.get(`/game/accounts/:id`, async (req, res) => {
    const result = await prisma.account.findFirst({
      where: {
        id: req.params.id,
      },
    });
    res.json(result);
  });

  app.post(`/game/accounts`, async (req, res) => {
    const result = await prisma.account.create({
      data: {
        ...req.body,
      },
    });
    res.status(201).json(result);
  });
}
