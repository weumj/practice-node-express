import passport from 'passport';
import { Strategy } from 'passport-local';

import _debug from 'debug';

import * as DB from '../../util/db';
import User from '../../types/user';

const debug = _debug('app.local.strategy');

const localStrategy = () => {
  passport.use(
    new Strategy(
      { usernameField: 'username', passwordField: 'password' },
      (username, password, done) => {
        DB.connect(async ({ db }) => {
          debug('Connected correctly to server');

          const col = db.collection('users');
          const user = await col.findOne<User>({ username });

          if (user && user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        }).catch(e => {
          debug(e.stack);
        });
      },
    ),
  );
};

export default localStrategy;
