import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { DepenceyInjection } from "../../../lib/dependency-injection";

export function useLocalStrategy(di: DepenceyInjection) {
  const strategy = new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await di.db.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return done(null, false);
      }

      const updateUser = await di.db.user.update({
        where: {
          id: user.id,
        },
        data: {
          account: {
            update: {
              balance: {
                set: 10,
              },
            },
          },
        },
      });

      return done(null, updateUser);
    }
  );

  passport.use(strategy);
}
