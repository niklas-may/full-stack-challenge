import { PrismaClient } from "@prisma/client";
import { E2eClient, useE2eClient } from "../../../__test__/e2e-client";
import app from "../../app";
import supertest from "supertest";
import portfinder from "portfinder";

describe("Game Module", () => {
  const db = new PrismaClient();
  let client: E2eClient;
  let server: ReturnType<typeof app.listen>;



  beforeAll(async () => {
    const port = await portfinder.getPortPromise();
    server = app.listen(port);
    client = await useE2eClient(app, db);
  });

  afterAll(async () => {
    await client.cleanup();
    server.close();
  });

  it("Should win eventually", async () => {
    const loginResponse = await client.login();
    await db.user.update({
      where: { id: client.user.id },
      data: {
        account: {
          update: {
            balance: { set: 1000 },
          },
        },
      },
      include: {
        account: true,
      },
    });

    let won = false;
    let idx = 0;
    while (!won) {
      const cookies = loginResponse.headers["set-cookie"];
      const response = (await supertest(app).get("/game/roll").set("Cookie", cookies)) as any;
      won = response.body.isWin;
      idx++;

      if (idx >= 1000) break;
    }

    if (won) {
      console.info("Won after", idx, "tries");
    }
    expect(won).toBe(true);
  });

  it("Should allow to roll with credits", async () => {
    const loginResponse = await client.login();
    const cookies = loginResponse.headers["set-cookie"];
    const response = (await supertest(app).get("/game/roll").set("Cookie", cookies)) as any;
    expect(response.status).toBe(200);
  });

  it("Should fail to roll with no credits", async () => {
    const loginResponse = await client.login();
    await db.user.update({
      where: { id: client.user.id },
      data: {
        account: {
          update: {
            balance: { set: 0 },
          },
        },
      },
      include: {
        account: true,
      },
    });
    const cookies = loginResponse.headers["set-cookie"];
    const response = (await supertest(app).get("/game/roll").set("Cookie", cookies)) as any;
    expect(response.status).toBe(400);
  });
});
