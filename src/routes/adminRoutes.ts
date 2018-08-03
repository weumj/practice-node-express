import { Request, Response, Router } from 'express';
import _debug from 'debug';
import { Nav } from '../index';

import * as DB from '../util/db';
import IBook from '../types/book';

const debug = _debug('app:adminRoutes');

const books: IBook[] = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    bookId: 656,
    read: false,
  },
  {
    title: 'Les Misérables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    bookId: 24280,
    read: false,
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    bookId: 656,
    read: false,
  },
  {
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    bookId: 656,
    read: false,
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    bookId: 656,
    read: false,
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    bookId: 656,
    read: false,
  },
  {
    title: 'Life On The Mississippi',
    genre: 'History',
    author: 'Mark Twain',
    bookId: 656,
    read: false,
  },
  {
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    bookId: 656,
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
