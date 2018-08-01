import { Request, Response, Router } from 'express';
import _debug from 'debug';
import { Nav } from '../index';

import * as DB from '../util/db';

const debug = _debug('app:adminRoutes');

const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read: false,
  },
  {
    title: 'Les Misérables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false,
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false,
  },
  {
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: false,
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false,
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false,
  },
  {
    title: 'Life On The Mississippi',
    genre: 'History',
    author: 'Mark Twain',
    read: false,
  },
  {
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    read: false,
  },
];

const router = (nav: Nav[], navTitle: string) => {
  const adminRouter = Router();

  adminRouter.route('/').get((req: Request, res: Response) => {
    DB.connect(async ({ db }) => {
      debug('Connected correctly to server');

      const response = await db.collection('books').insertMany(books);

      res.json(response);
    }).catch(e => {
      debug(e.stack);
    });
  });

  return adminRouter;
};

export default router;
