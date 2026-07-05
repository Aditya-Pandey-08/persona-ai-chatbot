import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import chatRoute from "./routes/chat.js";

dotenv.config();

const app = express();

// ===============================
// Middlewares
// ===============================

app.use(cors());

app.use(express.json());

// ===============================
// Routes
// ===============================

app.use("/chat", chatRoute);

// ===============================
// Home Route
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Persona AI Backend Running 🚀",
  });
});

// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});