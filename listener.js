const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const redis = require("redis");
const ProcessedUser = require("./Models/secondSchema.js");

dotenv.config({ path: "./config.env" });

const app = express();
const subscriber = redis.createClient({
  password: "PhL59kwyTJLI1Z8I0uatigwMV4w63Eq6",
  socket: {
    host: "redis-18130.c53.west-us.azure.redns.redis-cloud.com",
    port: 18130,
  },
});

const DB_URI = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

mongoose
  .connect(DB_URI)
  .then(() => console.log("DB connection is successful!"))
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1); // Exit process with failure
  });

subscriber.on("error", (err) => {
  console.error("Error connecting to Redis", err);
});

subscriber.connect();

subscriber.subscribe("user_created", async (message) => {
  try {
    const data = JSON.parse(message);
    data.modified_at = new Date();

    await ProcessedUser.create(data);
    console.log("Data processed and saved to second collection:", data);
  } catch (err) {
    console.error("Error processing message:", err);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8001, () => {
  console.log("Listener service is running at port 8001");
});
