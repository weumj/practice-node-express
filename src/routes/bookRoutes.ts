import { Router } from 'express';
import { Nav } from '../index';

import bookController from '../controllers/bookController';

const router = (nav: Nav[], navTitle: string) => {
  const bookRouter = Router();
  const { getIndex, getById, middleware } = bookController(nav, navTitle);

  bookRouter.use(middleware);

  bookRouter.route('/').get(getIndex);
  bookRouter.route('/:id').get(getById);

  return bookRouter;
};

export default router;
