const { parse } = require("dotenv");
const pool = require("../db/db");
const queries = require("../queries/message");

const getMessage = async (req, res) => {
  console.log("getMessage");
  const result = await pool.query(queries.getMessage);
  res.json(result.rows);
  // if (req.decoded.role === "admin") {
  //   pool.query(queries.getMessage, (error, results) => {
  //     if (error) throw error;
  //     res.status(200).json(results.rows);
  //   });
  // } else {
  //   let senderID = req.decoded.UserID;
  //   pool.query(queries.getUserMessage, [senderID], (error, results) => {
  //     if (error) throw error;
  //     res.status(200).json(results.rows);
  //   });
  // }
};

const getMessageByID = async (req, res) => {
  if (req.decoded.role === "admin") {
    const id = parseInt(req.params.id);
    pool.query(queries.getMessageByID, [id], (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  } else {
    return res.status(403).json({
      status: "error",
      msg: "No permission.",
    });
  }
};

const addMessage = async (req, res) => {
  console.log(req.decoded.role);
  console.log(req.body.SenderID);
  console.log(req.decoded.UserID);
  // if (
  //   // req.decoded.role === "admin" ||
  //   req.body.SenderID === req.decoded.UserID
  // ) {
  const { MessageID, ChatID, SenderID, MessageContent } = req.body;

  pool.query(
    queries.addMessage,
    [MessageID, ChatID, SenderID, MessageContent],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.status(201).send("Message added successfully!");
      }
    }
  );
};

//   } else {
//     return res.status(403).json({
//       status: "error",
//       msg: "No permission.",
//     });
//   }
// };

const deleteMessage = async (req, res) => {
  if (
    req.decoded.role === "admin" ||
    req.body.SenderID === req.decoded.UserID
  ) {
    const id = parseInt(req.params.id);
    pool.query(queries.deleteMessage, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Message deleted successfully!");
    });
  } else {
    return res.status(403).json({
      status: "error",
      msg: "No permission.",
    });
  }
};

const updateMessage = async (req, res) => {
  if (
    req.decoded.role === "admin" ||
    req.body.SenderID === req.decoded.UserID
  ) {
    const { MessageID, ChatID, SenderID, MessageContent } = req.body;
    pool.query(
      queries.updateMessage,
      [MessageID, ChatID, SenderID, MessageContent],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          res.status(200).send("Message updated!");
        }
      }
    );
  } else {
    return res.status(403).json({
      status: "error",
      msg: "No permission.",
    });
  }
};

module.exports = {
  getMessage,
  getMessageByID,
  addMessage,
  deleteMessage,
  updateMessage,
};
