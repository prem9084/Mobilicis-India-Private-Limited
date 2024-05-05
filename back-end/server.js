import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/db.js";
import authRoute from "./routes/authRoute.js";
import morgan from "morgan";

const app = express();

dotenv.config();
connectDb();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/auth", authRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listing on port ${PORT}`);
});
