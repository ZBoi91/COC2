const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const AuthModel = require("../queries/auth");

const register = async (req, res) => {
  try {
    const auth = await AuthModel.findUserByEmail(req.body.email);
    // console.log({ auth });
    if (auth) {
      return res.status(400).json({ status: "error", msg: "duplicate email" }); //if the email already exist
    }

    const hash = await bcrypt.hash(req.body.password, 12);
    const user = {
      UserID: req.body.userID,
      email: req.body.email,
      password: hash,
      name: req.body.name,
      location: req.body.location,
      role: req.body.role || "user",
    };
    await AuthModel.createUser(user);

    res.json({ status: "ok", msg: "user created" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: "invalid registration" });
  }
};

const login = async (req, res) => {
  try {
    const auth = await AuthModel.findUserByEmail(req.body.email);
    console.log({ auth });
    if (!auth) {
      console.log("user not found");
      return res.status(400).json({ status: "error", msg: "not authorized" });
    }

    const result = await bcrypt.compare(req.body.password, auth.Password);
    if (!result) {
      console.log("email or password error");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    const claims = {
      Email: auth.Email,
      role: auth.role,
      UserID: auth.UserID,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30D",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh, auth });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "login failed" });
  }
};

const refresh = (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    const claims = {
      Email: decoded.Email,
      role: decoded.role,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    res.json({ access });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "token refresh error" });
  }
};
const logout = (req, res) => {
  res.clearCookie("access");
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { register, login, refresh, logout };
