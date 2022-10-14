// Import dependencies
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send({
      success: false,
      error: "Access denied.",
    });
  }

  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
  } catch (error) {
    return res.status(401).send({
      success: false,
      error: "Token expired",
    });
  }

  next();
};
