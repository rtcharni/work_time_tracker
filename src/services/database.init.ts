import knex from 'knex';
import path from 'path';
// tslint:disable-next-line: no-var-requires
require('dotenv').config();
const pathToFile =
  process.env.NODE_ENV === 'production'
    ? path.resolve(__dirname, '../../..', 'knexfile.js')
    : path.resolve(__dirname, '../..', 'knexfile.js');

// tslint:disable-next-line: no-var-requires
const knexfile = require(pathToFile);

function initDatabaseConnection() {
  try {
    console.log(`Initing DB connection..`);
    const conn = knex(knexfile);
    return conn;
  } catch (error) {
    console.error(`Error while making initial database connection`);
    console.error(error);
  }
}

export class Database {
  static db = initDatabaseConnection();
}
