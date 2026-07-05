import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import chatRoute from "./routes/chat.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://persona-ai-chatbot-ibgqkl203-aditya-pandeys-projects-1c2b875d.vercel.app",
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

// Explicitly handle preflight
app.options("/chat", cors());

app.use(express.json());

app.use("/chat", chatRoute);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Persona AI Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});