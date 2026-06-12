import express from "express";
import "dotenv/config";

const PORT = process.env.PORT ? +process.env.PORT : 3000;

const app = express();

app.use("/", (req, res) => {
  return res.json({ message: "OK!!!" });
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
