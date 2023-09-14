const pool = require("../db/db");

const findUserByEmail = async (Email) => {
  const query = 'SELECT * FROM "Users" WHERE "Email" = $1';
  const values = [Email];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getMaxUserId = async () => {
  const query = 'SELECT MAX("UserID") FROM "Users"';

  const { rows } = await pool.query(query);
  return rows[0].max;
};

const createUser = async ({ email, password, name, location, role }) => {
  const UserID = (await getMaxUserId()) + 1;
  const query =
    'INSERT INTO "Users" ("UserID", "Email", "Password", "Name", "Location", "role") VALUES ($1, $2, $3, $4, $5, $6)';
  const values = [UserID, email, password, name, location, role];

  await pool.query(query, values);
};

module.exports = {
  findUserByEmail,
  createUser,
};
