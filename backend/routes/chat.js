import express from "express";

import { askLLM } from "../services/llm.js";

import hiteshPrompt from "../prompts/hiteshPrompt.js";
import piyushPrompt from "../prompts/piyushPrompt.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { persona, message, history } = req.body;

    if (!persona || !message) {
      return res.status(400).json({
        success: false,
        message: "Persona and message are required.",
      });
    }

    const systemPrompt =
      persona === "hitesh"
        ? hiteshPrompt
        : piyushPrompt;

        const response = await askLLM({
          persona,
          systemPrompt,
          history: history || [],
          userMessage: message,
    });

    res.json({
      success: true,
      response,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default router;