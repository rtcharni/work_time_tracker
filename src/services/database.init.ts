import knex from 'knex';
// tslint:disable-next-line: no-var-requires
require('dotenv').config();
// tslint:disable-next-line: no-var-requires
const knexfile = process.env.NODE_ENV === 'production' ? require('../../../knexfile') : require('../../knexfile');

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
