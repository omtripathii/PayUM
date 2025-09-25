// app.js
const express = require("express");
const apiRouter = require("./routes/apiRouter");
const cors = require("cors")
const app = express();
const cookieParser = require("cookie-parser")
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: '*',
  credentials: true
}));
// All routes under /api/v1
app.use("/api/v1", apiRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
