import { Request, Response } from 'express';
import { ObjectID } from 'mongodb';
import _debug from 'debug';

import * as DB from '../util/db';
import { Nav } from '../index';
import Book from '../types/book';
const debug = _debug('app:bookRoutes');

const bookController = (nav: Nav[], navTitle: string) => {
  const getIndex = (req: Request, res: Response) => {
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
  };
  const getById = (req: Request, res: Response) => {
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
  };

  const middleware = (req: Request, res: Response, next: () => void) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  };

  return {
    getIndex,
    getById,
    middleware,
  };
};

export default bookController;
