import { Request, Response, Router } from 'express';
import _debug from 'debug';
import { Nav } from '../index';

import { ObjectID } from 'mongodb';

import * as DB from '../util/db';
import Book from '../types/book';

const debug = _debug('app:bookRoutes');

const router = (nav: Nav[], navTitle: string) => {
  const bookRouter = Router();

  bookRouter.route('/').get((req: Request, res: Response) => {
    DB.connect(async ({ db }) => {
      debug('Connected correctly to server');

      const booksCollection = await db.collection('books');
      const books = await booksCollection.find().toArray();

      res.render('bookListView', {
        title: navTitle,
        nav,
        books,
      });
    }).catch(e => {
      debug(e.stack);
    });
  });

  bookRouter.route('/:id').get((req: Request, res: Response) => {
    const reqId: string = req.params.id;

    DB.connect(async ({ db }) => {
      debug('Connected correctly to server');

      const booksCollection = await db.collection<Book>('books');
      const book = await booksCollection.findOne({ _id: new ObjectID(reqId) });

      res.render('bookView', {
        title: navTitle,
        nav,
        book,
      });
    }).catch(e => {
      debug(e.stack);
    });
  });

  return bookRouter;
};

export default router;
