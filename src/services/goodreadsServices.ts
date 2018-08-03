import { promisify } from 'util';
import axios from 'axios';
import { Parser } from 'xml2js';
import _debug from 'debug';

const debug = _debug('app:goodreadsService');

const parser = new Parser({ explicitArray: false });
const getBookById = async (id: number) => {
  try {
    const response = await axios.get(
      `https://www.goodreads.com/book/show/${id}.xml?key=r5oV4OPffoSbhrmou9GEGA`,
    );

    const result = promisify(parser.parseString.bind(parser))(response);

    return result.GoodreadsResponse.book;
  } catch (e) {
    debug(e);
    throw e;
  }
};

export default {
  getBookById,
};
