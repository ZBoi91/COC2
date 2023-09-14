const getMessage =
  'select "MessageID", "ChatID", "SenderID", "MessageContent", "Timestamp","Users"."Name" from "Message" join "Users" on "Users"."UserID" = "Message"."SenderID"';
const getMessageByID = 'SELECT * FROM "Message" WHERE "MessageID" = $1';
const addMessage =
  'INSERT INTO "Message" ("MessageID", "ChatID", "SenderID", "MessageContent") VALUES ($1, $2, $3, $4)';
const deleteMessage = 'DELETE FROM "Message" WHERE "MessageID" = $1';
const updateMessage =
  'UPDATE "Message" SET "ChatID" = $2, "SenderID" = $3, "MessageContent" = $4 WHERE "MessageID" = $1';
const getUserMessage = 'SELECT * FROM "Message" WHERE "SenderID" = $1';

module.exports = {
  getMessage,
  getMessageByID,
  addMessage,
  deleteMessage,
  updateMessage,
  getUserMessage,
};
