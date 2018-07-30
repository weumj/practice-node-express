import express, { Request, Response, Router } from 'express';
import _debug from 'debug';
import morgan from 'morgan';
import path from 'path';
import { pipe } from './util/fn';
import bookRouter from './routes/bookRoutes';

const debug = _debug('app');

const app = express();
const { PORT: port = 3000 } = process.env;

const pathJoinResolve: ((resolvingPath: string) => string) = pipe(
  path.join.bind(path, __dirname, '..'),
  // path.resolve.bind(path, null),
);

const expressStatic: ((resolvingPath: string) => express.Handler) = pipe(
  pathJoinResolve,
  express.static.bind(express),
);

// view engine setting 이 위쪽에 있어야 resolve 가 제대로 됨.
app.set('views', pathJoinResolve('views'));
app.set('view engine', 'ejs');

app.use(morgan('tiny'));
app.use(expressStatic('../public/'));
app.use('/css', expressStatic('../node_modules/bootstrap/dist/css'));
app.use('/js', expressStatic('../node_modules/bootstrap/dist/js'));
app.use('/js', expressStatic('../node_modules/jquery/dist'));

app.use('/books', bookRouter);
app.get('/', (req: Request, res: Response) => {
  res.render('index', {
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
  });
});

app.listen(port, () => {
  debug('listening on port 3000');
  debug(__dirname);
});
