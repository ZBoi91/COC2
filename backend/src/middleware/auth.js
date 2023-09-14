const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    //auth is always in headers,
    return res.status(400).json({ status: "error", msg: "no token found" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");
  console.log({ token });

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;
      next();
    } catch (error) {
      // console.log(error);
      return res.status(401).json({
        status: "error",
        msg: "unauthorized",
      });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "forbidden" });
  }
};

const authAdmin = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    //auth is always in headers,
    return res.status(400).json({ status: "error", msg: "no token found" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

      if (decoded.role === "admin") {
        req.decoded = decoded;
        next();
      } else {
        throw new Error();
      }
    } catch (error) {
      return res.status(401).json({
        status: "error",
        msg: "unauthorized",
      });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "forbidden" });
  }
};

module.exports = { auth, authAdmin };
