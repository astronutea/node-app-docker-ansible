require("dotenv").config();
const express = require("express");
const { createClient } = require("redis");

const app = express();
const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const client = createClient({ url: REDIS_URL });

client.on("error", (err) => console.error("Redis error:", err));

async function start() {
  await client.connect();
  console.log("Connected to Redis");

  app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
  });

  app.get("/count", async (req, res) => {
    const count = await client.incr("visit_count");
    res.json({ count });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
