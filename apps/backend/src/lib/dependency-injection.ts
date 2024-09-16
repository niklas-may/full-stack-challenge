import { PrismaClient } from "@prisma/client";

export type DepenceyInjection = {
  db: PrismaClient;
};
