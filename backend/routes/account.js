const express = require("express");
const { route } = require("./userRouter");
const { default: auth } = require("../middlewares/auth");
const { UserDb, AcountsDb } = require("../db");
const { tranferInputValidation } = require("../types");
const { default: mongoose } = require("mongoose");

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

router.post("/transfer", auth, async (req, res) => {
  let session;
  try {
    // Taking Input and doin the Zod Validation
    const { id } = req.user;
    const toUserInfo = req.body;
    const toUserInfoValidated = tranferInputValidation.safeParse(toUserInfo);
    if (!toUserInfoValidated.success)
      return res.status(400).json({ msg: "Invalid Inouts are Given" });

    // Creating a new mongoose Session
    session = await mongoose.startSession();

    // Starting the Transaction
    session.startTransaction();

    const senderAccount = await AcountsDb.findOne({ userID: id }).session(
      session
    );
    if (!senderAccount || senderAccount.balance < toUserInfo.amount) {
      await session.abortTransaction(); // abort the session
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    //check if receiver exists
    const receiverAccount = await AcountsDb.findOne({
      userID: toUserInfo.toUser,
    }).session(session);
    if (!receiverAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    // Doing the Transfer from one Account to Another

    await AcountsDb.updateOne(
      { userID: id },
      { $inc: { balance: -toUserInfo.amount } }
    ).session(session);
    await AcountsDb.updateOne(
      { userID: toUserInfo.toUser },
      { $inc: { balance: +toUserInfo.amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    console.log(error);
  } finally {
    await session.endSession();
  }
});

module.exports = router;
