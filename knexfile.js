require('dotenv').config();

module.exports = {
  client: 'pg',
  connection: getConnection(),
  migrations: getMigration(),
  seeds: getSeeds(),
  debug: process.env.DBDEBUG ? true : false,
  acquireConnectionTimeout: process.env.DBTIMEOUT === undefined ? 60000 : parseInt(process.env.DBTIMEOUT, 10),
};

function getMigration() {
  if (process.env.NODE_ENV === 'production') {
    return { directory: `${__dirname}/dist/src/migrations` };
  }
  return undefined;
}

function getSeeds() {
  if (process.env.NODE_ENV === 'production') {
    return { directory: `${__dirname}/dist/src/seeds` };
  }
  return undefined;
}

function getConnection() {
  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  return {
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
    port: process.env.DBPORT,
    pool: {
      min: process.env.DBPOOLMIN === undefined ? 2 : parseInt(process.env.DBPOOLMIN, 10),
      max: process.env.DBPOOLMAX === undefined ? 10 : parseInt(process.env.DBPOOLMAX, 10),
    },
  };
}
