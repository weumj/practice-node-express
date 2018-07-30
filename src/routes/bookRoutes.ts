import { Request, Response, Router } from 'express';

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

const bookRouter = Router();

bookRouter.route('/').get((req: Request, res: Response) => {
  res.render('bookListView', {
    title: 'My Library',
    nav: [
      {
        title: 'Books',
        link: '/books',
      },
      {
        title: 'Authors',
        link: '/authors',
      },
    ],
    books,
  });
});
bookRouter.route('/:id').get((req: Request, res: Response) => {
  const reqTitle: string = req.params.id;

  res.render('bookView', {
    title: 'My Library',
    nav: [
      {
        title: 'Books',
        link: '/books',
      },
      {
        title: 'Authors',
        link: '/authors',
      },
    ],
    book: books.find(({ title }) => title === reqTitle),
    findBookName: reqTitle,
  });
});

export default bookRouter;
