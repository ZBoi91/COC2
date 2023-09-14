const getChat = 'SELECT * FROM "Chat" WHERE "User1ID" = $1';
const getChatByID = 'SELECT * FROM "Chat" WHERE "ChatID" = $1';
const addChat =
  'INSERT INTO "Chat" ("ChatID", "User1ID", "User2ID", "MessageContent", "Timestamp") VALUES ($1, $2, $3, $4, $5)';
const deleteChat = 'DELETE FROM "Chat" WHERE "ChatID" = $1';
const updateChat =
  'UPDATE "Chat" SET "User1ID" = $2, "User2ID" = $3, "MessageContent" = $4, "Timestamp" = $5 WHERE "ChatID" = $1';

module.exports = {
  getChat,
  getChatByID,
  addChat,
  deleteChat,
  updateChat,
};
