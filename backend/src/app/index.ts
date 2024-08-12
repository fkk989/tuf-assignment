import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { bannerRouter } from "./routes";

export const app = express();

app.use(cors(), bodyParser.json());

// Routers
app.use("/api/v1/banner", bannerRouter);
