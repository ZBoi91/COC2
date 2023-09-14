const pool = require("../db/db");
const queries = require("../queries/cards");

const getCards = async (req, res) => {
  const result = await pool.query(queries.getCards);
  res.json(result.rows);
};

const getCardsByID = async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await pool.query(queries.getCardsByID, [id]);
  res.json(result.rows);
};

const addCards = async (req, res) => {
  try {
    const { SellerID, Games, Name, Price, Description, CardsID, Image } =
      req.body;

    if (req.decoded.UserID != SellerID && req.decoded.role !== "admin") {
      return res.status(401).json({ status: "error", msg: "Unauthorized!" });
    }

    await pool.query(queries.addCards, [
      SellerID,
      Games,
      Name,
      Price,
      Description,
      CardsID,
      Image,
    ]);
    res.status(201).send("Card added successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const deleteCards = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await pool.query(queries.getCardsByID, [id]);
    if (result.rows.length === 0) {
      res.status(404).send("Card not found");
    }

    if (
      req.decoded.UserID !== result.rows[0].SellerID &&
      req.decoded.role !== "admin"
    ) {
      return res.status(401).json({ status: "error", msg: "Unauthorized!" });
    }

    await pool.query(queries.deleteCards, [id]);
    res.status(200).send("Card deleted successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const updateCards = async (req, res) => {
  try {
    const { SellerID, Games, Name, Price, Description, Image, CardsID } =
      req.body;

    const result = await pool.query(queries.getCardsByID, [CardsID]);
    if (result.rows.length === 0) {
      res.status(404).send("Card not found");
    }

    if (
      req.decoded.UserID !== result.rows[0].SellerID &&
      req.decoded.role !== "admin"
    ) {
      return res.status(401).json({ status: "error", msg: "Unauthorized!" });
    }

    await pool.query(queries.updateCards, [
      SellerID,
      Games,
      Name,
      Price,
      Description,
      Image,
      CardsID,
    ]);
    res.status(200).send("Card updated!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  getCards,
  getCardsByID,
  addCards,
  deleteCards,
  updateCards,
};
