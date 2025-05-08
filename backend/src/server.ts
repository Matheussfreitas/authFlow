import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server está rodando!");
});

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server rodando em https://localhost:${port}`);
});
