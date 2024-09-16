import { PrismaClient } from "@prisma/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export function useLocalStrategy(prisma: PrismaClient) {
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
        include: {
          account: true,
        },
      });

      if (!user) {
        return done(null, false);
      }
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          account: {
            update: {
              balance: 10,
            },
          },

        },
        include: {
          account: true,
        }
      });

      return done(null, updatedUser);
    }
  );

  passport.use(strategy);
}
