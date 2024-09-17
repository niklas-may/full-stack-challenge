import { PrismaClient, User } from "@prisma/client";
import app from "./app";
import supertest from "supertest";

describe("[App E2E]", () => {
  const db = new PrismaClient();

  let server: ReturnType<typeof app.listen>;
  let user: User;

  async function login() {
    return await supertest(app).post("/auth/login").send({ email: user.email, password: "your-password" });
  }

  beforeAll(async () => {
    server = app.listen(4001);
    user = await db.user.create({
      data: {
        email: "test@et2.com",
        account: {
          create: {
            balance: 10,
          },
        },
      },
    });
  });

  afterEach(async () => {
    await db.user.update({
      where: { id: user.id },
      data: {
        account: {
          update: {
            balance: 10,
          },
        },
      },
    });
  });

  afterAll(async () => {
    server.close();
    await db.user.delete({ where: { id: user.id } });
  });

  describe("Loged in", () => {
    it("Should return balance", async () => {
      const loginResponse = await login();
      const cookies = loginResponse.headers["set-cookie"];
      const response = (await supertest(app).get("/account").set("Cookie", cookies)) as any;
      expect(response.body.balance).toBeDefined();
    });

    it("Should allow to roll with credits", async () => {
      const loginResponse = await login();
      const cookies = loginResponse.headers["set-cookie"];
      const response = (await supertest(app).get("/game/roll").set("Cookie", cookies)) as any;
      expect(response.status).toBe(200);
    });

    it("Should fail to roll with no credits", async () => {
      const loginResponse = await login();
      await db.user.update({
        where: { id: user.id },
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

    it("Should win eventually", async () => {
      const loginResponse = await login();
      await db.user.update({
        where: { id: user.id },
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
        won = response.body.won;
        idx++;
        
        if (idx >= 1000) {
          break;
        }
      }
      console.info("Won after", idx, "tries");
      expect(won).toBe(true);
    });
  });

  describe("Not Logged in", () => {
    it("Should fail on protected routes", async () => {
      const protectedRoutes = ["/account", "/account/deposit", "/account/cashout", "/game/roll", "/auth/user"];

      for (const route of protectedRoutes) {
        const response = (await supertest(app).get(route)) as any;
        expect(response.status).toBe(401);
      }
    });
  });
});
