import express from "express";
import dotenv from "dotenv";
import { testConnection } from "./config/database.js";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", AuthRoutes);

dotenv.config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await testConnection();
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
