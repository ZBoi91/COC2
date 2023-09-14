const getUsers = 'SELECT * FROM "Users"';
const getUsersByID = 'SELECT * FROM "Users" WHERE "UserID" = $1';
const addUsers =
  'INSERT INTO "Users" ("UserID", "Email", "Password", "Name", "Location") VALUES ($1, $2, $3, $4, $5)';
const deleteUsers = 'DELETE FROM "Users" WHERE "UserID" = $1';
const updateUsers =
  'UPDATE "Users" SET  "Email" = $2, "Password" = $3, "Name" = $4, "Location" = $5 WHERE "UserID" = $1';

module.exports = {
    getUsers,
    getUsersByID,
    addUsers,
    deleteUsers,
    updateUsers,
};