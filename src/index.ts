import express, { Request, Response } from 'express';
import _debug from 'debug';
import morgan from 'morgan';
import path from 'path';

const debug = _debug('app');

const app = express();

app.use(morgan('tiny'));
// app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', (req: Request, res: Response) => {
  const filePath = './public/views/index.html';
  const resolvedPath = path.resolve(filePath);

  res.sendFile(resolvedPath);
});

app.listen('3000', () => {
  debug('listening on port 3000');
});
