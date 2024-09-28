import cors from "cors";
import express from "express";
import { DB_URI, NODE_ENV, PORT } from "./utils/constants";
import { connect } from "mongoose";

const app = express();
app.use(cors(), express.json());

const init = async () => {
  try {
    await connect(DB_URI);
    app.listen(PORT, () => {
      console.log(
        `PORT ${PORT} | ENV ${NODE_ENV} | Server is running | Connected to database`
      );
    });
  } catch (error) {
    console.log("An error occured while init the server", error);
  }
};

init();

app.get("/", (_, res) => {
  res.send("Recipe sharing app");
});
