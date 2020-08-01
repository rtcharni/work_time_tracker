import knex from "knex";
// tslint:disable-next-line: no-var-requires
require("dotenv").config();

function initDatabaseConnection() {
  try {
    console.log(`Initing DB connection..`);
    const conn = knex({
      client: "pg",
      // connection: process.env.PG_CONNECTION_STRING,
      connection: process.env.DATABASE_URL
        ? process.env.DATABASE_URL
        : {
            host: process.env.DBHOST,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DBDATABASE,
            pool: {
              min:
                process.env.DBPOOLMIN === undefined
                  ? 2
                  : parseInt(process.env.DBPOOLMIN, 10),
              max:
                process.env.DBPOOLMAX === undefined
                  ? 10
                  : parseInt(process.env.DBPOOLMAX, 10),
            },
          },
      debug: process.env.DBDEBUG ? true : false,
      acquireConnectionTimeout:
        process.env.DBTIMEOUT === undefined
          ? 60000
          : parseInt(process.env.DBTIMEOUT, 10),
    });
    console.log(`Connection is OK..`);
    return conn;
  } catch (error) {
    console.error(`Error while making initial database connection`);
    console.error(error);
  }
}

export class Database {
  static db = initDatabaseConnection();
}
