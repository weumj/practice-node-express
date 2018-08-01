import { Express } from 'express';
import passport from 'passport';

const passportConfig = (app: Express) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

export default passportConfig;
