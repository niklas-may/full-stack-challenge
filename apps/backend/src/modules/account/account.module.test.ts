import { PrismaClient } from "@prisma/client";
import supertest from "supertest";
import { E2eClient, useE2eClient } from "../../../__test__/e2e-client";
import app from "../../app";
import portfinder from "portfinder";

describe("Account Module", () => {
  const db = new PrismaClient();
  let client: E2eClient
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

  it("Should return balance", async () => {
    const loginResponse = await client.login();
    const cookies = loginResponse.headers["set-cookie"];
    const response = (await supertest(app).get("/account").set("Cookie", cookies)) as any;
    expect(response.body.balance).toBeDefined();
  });
});
