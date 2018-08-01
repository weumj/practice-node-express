import express, { Request, Response } from 'express';
import _debug from 'debug';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { pipe } from './util/fn';
import bookRouterFactory from './routes/bookRoutes';
import adminRouterFactory from './routes/adminRoutes';
import authRouterFactory from './routes/authRoutes';

import passportConfig from './config/passport';

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

passportConfig(app);

app.use(expressStatic('../public/'));
app.use('/css', expressStatic('../node_modules/bootstrap/dist/css'));
app.use('/js', expressStatic('../node_modules/bootstrap/dist/js'));
app.use('/js', expressStatic('../node_modules/jquery/dist'));

export interface Nav {
  title: string;
  link: string;
}

const nav: Nav[] = [
  {
    title: 'Books',
    link: '/books',
  },
  {
    title: 'Authors',
    link: '/authors',
  },
];

const TITLE = 'My Library';

app.use('/books', bookRouterFactory(nav, TITLE));
app.use('/admin', adminRouterFactory(nav, TITLE));
app.use('/auth', authRouterFactory(nav));
app.get('/', (req: Request, res: Response) => {
  res.render('index', {
    title: TITLE,
    nav,
  });
});

app.listen(port, () => {
  debug('listening on port 3000');
  debug(__dirname);
});
