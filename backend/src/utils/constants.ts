import dotenv from "dotenv";
import env from "env-var";
import fs from "node:fs";
import path from "node:path";

// get node env
export const NODE_ENV = env.get("NODE_ENV").required().asString().trim();

// import env file, based on node env
const envFilePath = path.join(__dirname, "..", "..", `.env.${NODE_ENV}`);
if (fs.existsSync(envFilePath)) {
  dotenv.config({
    path: envFilePath,
  });
}

// get env variables
export const PORT = env.get("PORT").default(4000).asPortNumber();
