const { parse } = require("dotenv");
const pool = require("../db/db");
const queries = require("../queries/chat");

const getChat = async (req, res) => {
  let userId = null;

  // If role is not admin, set userId to the authenticated user's id
  if (req.decoded.role !== "admin") {
    userId = req.decoded.userID;
  }

  const result = await pool.query(queries.getChat, [userId]);
  res.json(result.rows);
};

const getChatByID = async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await pool.query(queries.getChatByID, [id]);

  // Ensure the authenticated user is part of the requested chat
  if (
    req.decoded.userID != result.rows[0].user1id &&
    req.decoded.userID != result.rows[0].user2id
  ) {
    res.status(403).send("Not authorized to access this chat");
  } else {
    res.json(result.rows);
  }
};

const addChat = async (req, res) => {
  const { ChatID, User1ID, User2ID, MessageContent, Timestamp } = req.body;

  if (req.decoded.userID != User1ID && req.decoded.userID != User2ID) {
    res.status(403).send("Not authorized to add this chat");
  } else {
    await pool.query(queries.addChat, [
      ChatID,
      User1ID,
      User2ID,
      MessageContent,
      Timestamp,
    ]);
    res.status(201).send("Chat added successfully!");
  }
};

const deleteChat = async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await pool.query(queries.getChatByID, [id]);

  if (
    req.decoded.role === "admin" ||
    req.decoded.userID === result.rows[0].user1id ||
    req.decoded.userID === result.rows[0].user2id
  ) {
    await pool.query(queries.deleteChat, [id]);
    res.status(200).send("Chat deleted successfully!");
  } else {
    res.status(403).send("Not authorized to delete this chat");
  }
};

module.exports = {
  getChat,
  getChatByID,
  addChat,
  deleteChat,
};
