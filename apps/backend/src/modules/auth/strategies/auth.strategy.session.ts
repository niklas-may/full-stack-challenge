import { type Express } from "express";
import passport from "passport";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import { DepenceyInjection } from "../../../lib/dependency-injection";
import { AuthUser } from "../utils/request-user";

export function useSessionStrategy(app: Express, di: DepenceyInjection) {
  const sess = session({
    name: "full-stack-chalenge:auth",
    secret: "your-secret-key", // TODO: replace
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "lax",
    },
    store: new PrismaSessionStore(di.db, {
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  });

  passport.deserializeUser(deserializeUser(di.db));
  passport.serializeUser(serializeUser(di.db));

  app.use(sess);
  app.use(passport.initialize());
  app.use(passport.session());
}

function serializeUser(prisma: PrismaClient) {
  return async (user: any, done: (e: any, user?: Express.User) => void) => {
    process.nextTick(() => {

      done(null, user);
    });
  };
}

function deserializeUser(prisma: PrismaClient) {
  return async (authUser: AuthUser, done: (e: any, user?: Express.User) => void) => {
    process.nextTick(async () => {
      done(null, authUser);
    });
  };
}
