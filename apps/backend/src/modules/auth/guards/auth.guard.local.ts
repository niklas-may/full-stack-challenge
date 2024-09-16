import passport from "passport";

export const localGuard =  passport.authenticate("local");
