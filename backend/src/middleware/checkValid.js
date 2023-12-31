const { validationResult } = require("express-validator");

const validation = (req, res, next) => {
  const errors = validationResult(req);
  console.log("errr", errors);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

module.exports = validation;
