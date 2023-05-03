const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(403).json({
      status: 403,
      message: "A Token is Required for Authentication",
    });
  }

  bearer = bearerHeader.split(" ");
  token = bearer[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const dateNow = new Date();
    const miliseconds = dateNow.getTime() / 1000;
    if (decoded.exp < miliseconds) {
      return res.status(401).json({
        status: 401,
        message: "Token is Expired",
      });
    }

    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: "Token is Invalid",
    });
  }

  return next();
};

module.exports = verifyToken;
