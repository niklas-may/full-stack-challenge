import { type Express } from "express";
import passport from "passport";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";

export function useSessionStrategy(app: Express, prisma: PrismaClient) {
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
    store: new PrismaSessionStore(prisma, {
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  });

  passport.deserializeUser(deserializeUser);
  passport.serializeUser(serializeUser);

  app.use(sess);
  app.use(passport.initialize());
  app.use(passport.session());
}

function serializeUser(user: Express.User, done: (e: any, id?: unknown) => void) {
  process.nextTick(() => {
    done(null, user);
  });
}

function deserializeUser(id: Express.User, done: (e: any, user?: Express.User) => void) {
  process.nextTick(() => {
    done(null, id);
  });
}
