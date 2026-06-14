const express = require("express");
require("dotenv").config();
const { createClient } = require("redis");
const { Client: PgClient } = require("pg");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const REDIS_URL = process.env.REDIS_URL;
const POSTGRES_URL = process.env.POSTGRES_URL;

const app = express();
let redisConnected = false;
let postgresConnected = false;

const redisClient = createClient({ url: REDIS_URL });
redisClient.on("error", (error) => {
  console.error("Redis client error:", error);
});

const pgClient = new PgClient({
  connectionString: POSTGRES_URL,
});

async function connectDatabases() {
  try {
    await redisClient.connect();
    redisConnected = true;
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }

  try {
    await pgClient.connect();
    postgresConnected = true;
    console.log("Connected to Postgres");
  } catch (error) {
    console.error("Failed to connect to Postgres:", error);
  }
}

app.get("/", (req, res) => {
  return res.json({
    message: "Everything seems fine here!",
    redis: redisConnected,
    postgres: postgresConnected,
  });
});

app.get("/health", (req, res) => {
  return res.json({
    healthy: "true",
  });
});

app.listen(PORT, async () => {
  await connectDatabases();
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});

//to install a package do:
//docker compose exec backend npm install <packagename>
