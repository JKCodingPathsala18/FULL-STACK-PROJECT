const pg = require('pg');
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'MenuCard',
  password: 'JK',
  port: 5432, // default PostgreSQL port
});

module.exports = pool;