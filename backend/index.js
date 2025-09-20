// app.js
const express = require("express");
const apiRouter = require("./routes/apiRouter");
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(cors())
// All routes under /api/v1
app.use("/api/v1", apiRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
