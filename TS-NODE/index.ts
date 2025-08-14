import express, { Request, Response, Express } from "express";
import { addRoutes } from "./src/config/routes.config";
import "reflect-metadata";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import { responseFormatter } from "./src/middleware/responseformatter.middleware";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());
app.use(responseFormatter);

addRoutes(app);

async function bootStrap() {
  if (!process.env.DATABASE_URL) {
    throw new Error("Database URL not found");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DB_NAME,
    });
    console.log("Connected to mongoDB");
    app.listen(port, () => {
      console.log("Server is listening on port", port);
    });
  } catch (error) {
    console.log(error);
  }
}

bootStrap();
