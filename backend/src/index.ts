import cors from "cors";
import express from "express";
import { NODE_ENV, PORT } from "./utils/constants";

const app = express();

app.use(cors(), express.json());

app.get("/", (_, res) => {
  res.send("Recipe sharing app");
});

app.listen(PORT, () => {
  console.log(`PORT ${PORT} | ENV ${NODE_ENV} | Server is running`);
});
