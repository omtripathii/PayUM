import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export default function (req, res, next) {
  const token = req.cookies.token;
  try {
    const tokenVerify = jwt.verify(token, JWT_SECRET);
    if (!tokenVerify) {
      res.status(401).json({
        msg: "Invalid Token ",
      });
    }

    req.user = tokenVerify;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}
