import { Request, Response, Router } from 'express';
import passport from 'passport';
import _debug from 'debug';

import * as DB from '../util/db';
import { Nav } from '../index';

const debug = _debug('app:authRoutes');

const router = (nav: Nav[]) => {
  const authRouter = Router();

  authRouter.route('/signUp').post((req: Request, res: Response) => {
    DB.connect(async ({ db }) => {
      debug('Connected correctly to server');

      const { username, password } = req.body;
      const user = { username, password };

      const col = db.collection('users');

      const result = await col.insertOne(user);
      const loginedUser = result.ops[0];

      req.login(loginedUser, () => {
        res.redirect('/profile');
      });
    }).catch(e => {
      debug(e.stack);
    });
  });

  authRouter
    .route('/signIn')
    .get((req, res) => {
      res.render('signIn', {
        nav,
        title: 'Sign In',
      });
    })
    .post(
      passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/',
      }),
    );

  authRouter.route('/profile').get((req, res) => {
    res.json(req.user);
  });

  return authRouter;
};

export default router;
