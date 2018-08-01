import { Request, Response, Router } from 'express';
import _debug from 'debug';

import * as DB from '../util/db';

const debug = _debug('app:authRoutes');

const router = () => {
  const authRouter = Router();

  authRouter.route('/signUp').post((req: Request, res: Response) => {
    debug(req.body);

    req.login(req.body, () => {
      res.redirect('/auth/profile');
    });
  });

  authRouter.route('/profile').get((req, res) => {
    res.json(req.user);
  });

  return authRouter;
};

export default router;
