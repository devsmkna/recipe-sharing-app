import cors from "cors";
import express from "express";
import { PORT } from "./utils/constants";

const app = express();

app.use(cors());

app.get("/", (_, res) => {
  res.send("Recipe sharing app");
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
