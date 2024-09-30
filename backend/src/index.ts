import cors from "cors";
import express from "express";
import { DB_URI, NODE_ENV, PORT } from "./utils/constants";
import { connect } from "mongoose";
import v1 from "./routes/v1/v1";

const app = express();
app.use(cors(), express.json());

app.use("/v1", v1);

const init = async () => {
  try {
    await connect(DB_URI);
    app.listen(PORT, () => {
      console.log(
        `PORT ${PORT} | ENV ${NODE_ENV} | Server is running | Connected to database`,
      );
    });
  } catch (error) {
    console.error("An error occured while init the server", error);
  }
};

init();

export default app;
