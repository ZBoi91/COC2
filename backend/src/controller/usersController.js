const { parse } = require("dotenv");
const pool = require("../db/db");
const queries = require("../queries/users");

const getUsers = async (req, res) => {
  if (req.decoded.role !== "admin") {
    return res.status(403).json({ status: "error", msg: "Unauthorized!" });
  }

  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getUsersByID = async (req, res) => {
  const id = parseInt(req.params.id);

  if (req.decoded.UserID != id && req.decoded.role !== "admin") {
    return res.status(403).json({ status: "error", msg: "Unauthorized!" });
  }

  pool.query(queries.getUsersByID, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addUsers = async (req, res) => {
  if (req.decoded.role !== "admin") {
    return res.status(403).json({ status: "error", msg: "Unauthorized!" });
  }

  const { UserID, Email, Password, Name, Location } = req.body;

  pool.query(
    queries.addUsers,
    [UserID, Email, Password, Name, Location],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("User added successfully!");
    }
  );
};

const deleteUsers = async (req, res) => {
  const id = parseInt(req.params.id);

  if (req.decoded.UserID != id && req.decoded.role !== "admin") {
    return res.status(403).json({ status: "error", msg: "Unauthorized!" });
  }

  pool.query(queries.deleteUsers, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send("User deleted successfully!");
  });
};

const updateUsers = async (req, res) => {
  const { UserID, Email, Password, Name, Location } = req.body;

  if (req.decoded.UserID != UserID && req.decoded.role !== "admin") {
    return res.status(403).json({ status: "error", msg: "Unauthorized!" });
  }

  pool.query(
    queries.updateUsers,
    [UserID, Email, Password, Name, Location],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.status(200).send("User updated!");
      }
    }
  );
};


module.exports = {
  getUsers,
  getUsersByID,
  addUsers,
  deleteUsers,
  updateUsers,
};
