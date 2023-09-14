const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Cards_of_Commerce_DB",
  password: "ZBoi!991",
  // password: "root",
  port: 5432,
  // port: 5434,
});

module.exports = pool;
