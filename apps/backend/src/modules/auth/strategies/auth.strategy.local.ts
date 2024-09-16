import { PrismaClient } from "@prisma/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export function useLocalStrategy( prisma: PrismaClient) {
  const strategy = new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,

    },
    async (req, email, password, done) => {
      
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return done(null, false);
      }

      return done(null, email);
    }
  );

  passport.use(strategy);
}
