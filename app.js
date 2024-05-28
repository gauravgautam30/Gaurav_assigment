const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./Routes/userRouter.js");

const app = express();

app.use(express.json());
dotenv.config({ path: "./config.env" });

const DB_URI = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

mongoose
  .connect(DB_URI)
  .then(() => console.log("DB connection is successful!"))
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1); // Exit process with failure
  });

app.use("/receiver", userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is running at port 8000");
});
