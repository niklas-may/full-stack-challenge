import { PrismaClient } from "@prisma/client";
import supertest from "supertest";
import { E2eClient, useE2eClient } from "../__test__/e2e-client";
import app from "./app";
import portfinder from "portfinder";

describe("App", () => {
  const db = new PrismaClient();
  let client: E2eClient;
  let server: ReturnType<typeof app.listen>;

  beforeAll(async () => {
    const port = await portfinder.getPortPromise();
    server = app.listen(port);
    client = await useE2eClient(app, db);
  });

  afterAll(async () => {
    server.close();
    await client.cleanup();
  });

  it("Should fail on protected routes", async () => {
    const protectedRoutes = ["/account", "/account/deposit", "/account/cashout", "/game/roll", "/auth/user"];

    for (const route of protectedRoutes) {
      const response = (await supertest(app).get(route)) as any;
      expect(response.status).toBe(401);
    }
  });
});
