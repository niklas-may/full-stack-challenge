import { PrismaClient, User } from "@prisma/client";
import { UnwrapPromise } from "@prisma/client/runtime/library";
import supertest from "supertest";
import { App } from "supertest/types";

export type E2eClient = UnwrapPromise<ReturnType<typeof useE2eClient>>;

export async function useE2eClient(app: App, db: PrismaClient) {
  const email = `test_${Math.random()}@e2e.com`;

  const user = await creaeUser(email, db);

  return {
    user,
    cleanup: async () => await cleanup(user, db),
    login: async () => await login(app, email),
    logout: async () => await logout(app),
  };
}

async function login(app: App, email: string) {
  return await supertest(app).post("/auth/login").send({ email, password: "your-password" });
}

async function logout(app: App) {
  return await supertest(app).post("/auth/logout").send();
}

async function creaeUser(email: string, db: PrismaClient) {
  const user = await db.user.create({
    data: {
      email,
      account: {
        create: {
          balance: 10,
        },
      },
    },
  });

  return user;
}

async function cleanup(user: User, db: PrismaClient) {
  await db.user.delete({ where: { id: user.id } });
}
