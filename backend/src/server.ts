import express, { Express } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
