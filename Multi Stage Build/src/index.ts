import type { Request, Response } from "express";
import express from "express";

import "dotenv/config";

const PORT = process.env.PORT ? +process.env.PORT : 3000;

const app = express();

app.use("/", (req: Request, res: Response) => {
  return res.json({ message: " TS Mode on!" });
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
