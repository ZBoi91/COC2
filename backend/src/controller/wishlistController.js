const { parse } = require("dotenv");
const pool = require("../db/db");
const queries = require("../queries/wishlist");

const getWishlist = async (req, res) => {
  if (req.decoded.role === "admin") {
    const result = await pool.query(queries.getWishlist);
    res.json(result.rows);
  } else {
    const result = await pool.query(queries.getWishlistByID, [
      req.decoded.UserID,
    ]);
    res.json(result.rows);
  }
};

const getWishlistByID = async (req, res) => {
  const id = parseInt(req.params.id);

  if (req.decoded.UserID !== id && req.decoded.role !== "admin") {
    return res
      .status(401)
      .json({ status: "error", msg: "Unauthorized operation!" });
  }

  pool.query(queries.getWishlistByID, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addWishlist = async (req, res) => {
  const { WishlistID, UserID, CardsID } = req.body;

  if (req.decoded.UserID !== UserID && req.decoded.role !== "admin") {
    return res
      .status(401)
      .json({ status: "error", msg: "Unauthorized operation!" });
  }

  pool.query(
    queries.addWishlist,
    [WishlistID, UserID, CardsID],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Wishlist added successfully!");
    }
  );
};

const deleteWishlist = async (req, res) => {
  const id = parseInt(req.params.id);

  const result = await pool.query(queries.getWishlistByID, [id]);
  if (result.rows.length === 0) {
    res.status(404).send("Wishlist not found");
  }

  if (
    req.decoded.UserID !== result.rows[0].userid &&
    req.decoded.role !== "admin"
  ) {
    return res
      .status(401)
      .json({ status: "error", msg: "Unauthorized operation!" });
  }

  pool.query(queries.deleteWishlist, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send("Wishlist deleted successfully!");
  });
};

const updateWishlist = async (req, res) => {
  const { WishlistID, UserID, CardsID } = req.body;

  const result = await pool.query(queries.getWishlistByID, [WishlistID]);
  if (result.rows.length === 0) {
    res.status(404).send("Wishlist not found");
  }

  if (
    req.decoded.UserID !== result.rows[0].userid &&
    req.decoded.role !== "admin"
  ) {
    return res
      .status(401)
      .json({ status: "error", msg: "Unauthorized operation!" });
  }

  pool.query(
    queries.updateWishlist,
    [WishlistID, UserID, CardsID],
    (error, results) => {
      if (error) throw error;
      res.status(200).send("Wishlist updated successfully!");
    }
  );
};

module.exports = {
  getWishlist,
  getWishlistByID,
  addWishlist,
  deleteWishlist,
  updateWishlist,
};
