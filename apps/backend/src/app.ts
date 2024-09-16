import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import { useSessionStrategy } from "./modules/auth/strategies/auth.strategy.session";
import { useLocalStrategy } from "./modules/auth/strategies/auth.strategy.local";
import { DepenceyInjection } from "./lib/dependency-injection";
import { useGameModule } from "./modules/game/game.module";
import { useAuthModule } from "./modules/auth/auth.module";
import { useAccountModule } from "./modules/account/account.module";

const prisma = new PrismaClient();
const di: DepenceyInjection = {
  db: prisma,
};

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", methods: "GET,HEAD,PUT,PATCH,POST,DELETE", credentials: true }));

useLocalStrategy(di);
useSessionStrategy(app, di);

useAuthModule(app, di);
useGameModule(app, di);
useAccountModule(app, di);

export default app;
