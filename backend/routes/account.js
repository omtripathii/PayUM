const express = require("express");
const { route } = require("./userRouter");
const { default: auth } = require("../middlewares/auth");
const { UserDb, AcountsDb } = require("../db");

const app = express();

const router = express.Router();

app.use(express.json());

router.get("/balance", auth, async (req, res) => {
  try {
    const { id } = req.user;
    const userInfo = await AcountsDb.findOne({ userID: id });
    console.log(userInfo);
    const balance = userInfo.balance;
    res.status(200).json({
      balance,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/transfer", auth, async (req, res) => {});

module.exports = router;
