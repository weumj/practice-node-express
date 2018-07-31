import { Request, Response, Router } from 'express';
import { MongoClient } from 'mongodb';
import _debug from 'debug';
import { Nav } from '../index';

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

  adminRouter.route('/').get(async (req: Request, res: Response) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    let client: MongoClient | void;
    try {
      client = await MongoClient.connect(url);
      _debug('Connected corrrectly to server');

      const db = client.db(dbName);

      const response = await db.collection('books').insertMany(books);

      res.json(response);
    } catch (e) {
      debug(e.stack);
    } finally {
      // noinspection TsLint
      client && client.close();
    }
  });

  return adminRouter;
};

export default router;
