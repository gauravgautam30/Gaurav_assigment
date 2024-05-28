const express = require("express");
const User = require("../Models/firstSchema.js");
const { v4: uuidv4 } = require("uuid");
const redis = require("redis");

const router = express.Router();

const publisher = redis.createClient({
  password: "PhL59kwyTJLI1Z8I0uatigwMV4w63Eq6",
  socket: {
    host: "redis-18130.c53.west-us.azure.redns.redis-cloud.com",
    port: 18130,
  },
});
publisher.on("error", (err) => {
  console.error("Error connecting to Redis", err);
});

publisher.connect();

router.post("/", async (req, res) => {
  try {
    const { user, class: userClass, age, email } = req.body;

    if (!user || !userClass || !age || !email) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const data = await User.create({
      id: uuidv4(),
      user,
      class: userClass,
      age,
      email,
      inserted_at: new Date(),
    });

    // Publish event to Redis
    publisher.publish("user_created", JSON.stringify(data));

    res.status(201).json({
      status: "success",
      data,
    });
  } catch (err) {
    console.error("Error processing request:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
