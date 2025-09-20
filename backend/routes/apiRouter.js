const express = require("express");
const app = express();
const userRouter = require("./userRouter");
const account = require("./account");
const router = express.Router();
router.use("/user", userRouter);
router.use("/account", account);
module.exports = router;
