// const router = require("express").Router();
// const pool = require("../db/db");
// //registering
// router.post("/register", async (req, res) => {
//   try {
//     const { UserID, Email, Password, Name, Location } = req.body;
//     const user = await pool.query('SELECT * FROM Users WHERE "Email" = $1', [
//       Email,
//     ]);

//     if (user.rows.length !== 0) {
//         return res.status(401).send("User already exists!")
//     }

//     res.json(user.rows);

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  register,
  login,
  refresh,
  logout,
} = require("../controller/authController");

const {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
} = require("../validators/auth");
const checkValid = require("../middleware/checkValid");

router.post("/register", validateRegistrationData, checkValid, register);
router.post("/login", validateLoginData, checkValid, login);
router.post("/refresh", validateRefreshToken, checkValid, refresh);
router.get("/logout", logout);

module.exports = router;
