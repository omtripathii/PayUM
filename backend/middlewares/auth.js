const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
export default function (req, res, next) {
  const token = req.headers["authorization"];
  try {
    const tokenVerify = jwt.verify(token, JWT_SECRET);
    if (!tokenVerify) {
      res.status(401).json({
        msg: "Invalid Token ",
      });
      return;
    }

    req.user = tokenVerify;

    next();
  } catch (error) {
    console.log(error);
  }
}
