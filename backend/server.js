import express from "express";
import dotenv from "dotenv";
import { testConnection } from "./config/database.js";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import TaskRoutes from "./routes/TaskRoutes.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8081",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", AuthRoutes);
app.use("/api/task", TaskRoutes);

dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await testConnection();
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
