import { MongoClient, Db } from 'mongodb';

export const URL = 'mongodb://localhost:27017'; // env.db.url
export const DB_NAME = 'libraryApp'; // env.db.name

export interface ClientAndDB {
  client: MongoClient;
  db: Db;
}

export const connect = async (fn: (foo: ClientAndDB) => Promise<any>) => {
  const client: MongoClient = await MongoClient.connect(URL);

  const db = client.db(DB_NAME);

  await fn({ client, db });

  if (client && client.isConnected()) {
    client.close();
  }
};
