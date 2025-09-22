// routes/userRouter.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {
  newUserValidation,
  inputUserValidation,
  passwordChangeValidation,
  inputNameValidation,
} = require("../types");
const { UserDb } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { default: auth } = require("../middlewares/auth");
// POST /api/v1/user/signup
router.post("/signup", async (req, res) => {
  const userInput = req.body;
  const validatedUserInput = newUserValidation.safeParse(userInput);

  if (!validatedUserInput.success) {
    return res.status(400).json({
      msg: "Sorry, invalid inputs have been given",
      errors: validatedUserInput.error.errors,
    });
  }

  const { firstName, lastName, username, password } = userInput;
  // Check if already in db ?

  const checkUser = await UserDb.findOne({ username: username });
  if (checkUser) res.status(500).json({ msg: "This User already in Databse" });

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    await UserDb.create({
      firstName,
      lastName,
      username,
      password: hashPassword,
    });

    res.status(201).json({
      msg: "User created successfully",
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// GET /api/v1/user/signin

router.get("/signin", async (req, res) => {
  // User input and Validation
  const userInput = req.body;
  const validatedUserInput = inputUserValidation.safeParse(userInput);
  if (!validatedUserInput.success)
    res.status(411).json({ msg: "Input invalid" });
  // Checking if it exists
  const checkUser = await UserDb.findOne({ username: userInput.username });
  if (!checkUser) res.status(411).json({ msg: "Incalid Credintials" });

  // checking pass
  const checkUserPass = await bcrypt.compare(
    userInput.password,
    checkUser.password
  );
  if (!checkUserPass) res.status(411).json({ msg: "Invalid Credintials" });

  const token = jwt.sign(
    { id: checkUser._id, username: checkUser.username },
    JWT_SECRET
  );

  res.status(200).json({
    token,
    msg: "Signed in successfully",
  });
});

// Getting the Users to Send Money

router.get("/users", auth, async (req, res) => {
  const { id, username } = req.user;
  const friendList = await UserDb.find(
    {
      id: { $ne: id },
    },
    { password: 0, username: 0 }
  );
  res.status(200).json({
    friendList,
  });
});

// Updating User Info

router.put("/update", auth, async (req, res) => {
  const userId = req.user.id;
  const modifyInput = req.body;
  const validatedmodifyInput = passwordChangeValidation.safeParse(modifyInput);
  if (!validatedmodifyInput.success)
    res.status(411).json({ msg: "INvalid input" });

  const { newPassword, firstName, lastName } = validatedmodifyInput.data;
  let updateFields = {};

  if (newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    updateFields.password = hashedPassword;
  }
  if (firstName) updateFields.firstName = firstName;
  if (lastName) updateFields.lastName = lastName;

  await UserDb.updateOne({ _id: userId }, { $set: updateFields });

  res.status(200).json({
    msg: "successfully Updated",
  });
});

// Filter by firstName and lastName

// router.get("/bulk", auth, async (req, res) => {
//   const name = req.query.name || "";
//   const { id, username } = req.user;

//   try {
//     const filterList = await UserDb.find({
//       _id: { $ne: new mongoose.Types.ObjectId(id) },
//       $or: [
//         { firstName: { $regex: name, $options: "i" } },
//         { lastName: { $regex: name, $options: "i" } },
//         { username: { $regex: name, $options: "i" } }, // include this too
//       ],
//     }).select("-password");

//     res.status(200).json({ filterList });
//   } catch (error) {
//     console.log("Error in /bulk:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.get("/bulk", async (req, res) => {
  const filter = req.query.name;
  const filteredList = await UserDb.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
  }).select("-password");

  res.json({
    filteredList,
  });
});

module.exports = router;
