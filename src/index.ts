import express, { Request, Response } from 'express';
import _debug from 'debug';
import morgan from 'morgan';
import path from 'path';
import pug from 'pug';
import { pipe } from './util/fn';

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

app.set('views', pathJoinResolve('src/views'));
app.set('view engine', 'pug');

app.use(morgan('tiny'));
app.use(expressStatic('/public/'));
app.use('/css', expressStatic('../node_modules/bootstrap/dist/css'));
app.use('/js', expressStatic('../node_modules/bootstrap/dist/js'));
app.use('/js', expressStatic('../node_modules/jquery/dist'));

app.get('/', (req: Request, res: Response) => {
  // res.sendFile(pathJoinResolve('/views/index.html'));
  res.render('index');
});

app.listen(port, () => {
  debug('listening on port 3000');
  debug(__dirname);
});
