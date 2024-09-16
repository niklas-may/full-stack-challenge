import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import { useSessionStrategy } from "./modules/auth/strategies/auth.strategy.session";
import { useLocalStrategy } from "./modules/auth/strategies/auth.strategy.local";
import { useAuthRoutes } from "./modules/auth/auth.routes";
import { useGameRoutes } from "./modules/game/game.routes";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", methods: "GET,HEAD,PUT,PATCH,POST,DELETE", credentials: true }));

useLocalStrategy(prisma);
useSessionStrategy(app, prisma);

useAuthRoutes(app, prisma);
useGameRoutes(app, prisma);

export default app;
