import readline from "readline";
import { loadData } from "./backend/utils/loadData.js";
import { askLLM } from "./services/llm.js";

import hiteshPrompt from "./backend/prompts/hiteshPrompt.js";
import piyushPrompt from "./backend/prompts/piyushPrompt.js";

// ===============================
// Readline
// ===============================

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// ===============================
// Choose Persona
// ===============================

async function choosePersona() {
  const choice = await ask(`
====================================
        Persona AI Chatbot
====================================

1. Hitesh Choudhary

2. Piyush Garg

Choose Persona: `);

  if (choice === "1") return "hitesh";

  if (choice === "2") return "piyush";

  console.log("❌ Invalid Choice");

  process.exit();
}

// ===============================
// Main Chat
// ===============================

async function startChat() {
  const persona = await choosePersona();

  const systemPrompt =
    persona === "hitesh"
      ? hiteshPrompt
      : piyushPrompt;

  console.log("\n📚 Loading Persona Data...\n");

  const personaData = loadData(persona);

  console.log("✅ Persona Loaded Successfully!");

  console.log(`
====================================

Type /exit to quit.

Type /clear to clear history.

====================================
`);

  const history = [];

  while (true) {

    const userMessage = await ask("\nYou : ");

    // Exit

    if (userMessage === "/exit") {

      console.log("\n👋 Goodbye!");

      rl.close();

      process.exit();

    }

    // Clear History

    if (userMessage === "/clear") {

      history.length = 0;

      console.log("\n✅ History Cleared!");

      continue;

    }

    console.log("\n🤖 Thinking...\n");

    const response = await askLLM({

      systemPrompt,

      personaData,

      history,

      userMessage,

    });

    console.log(`${persona.toUpperCase()} : ${response}\n`);

    // Save History

    history.push({

      role: "user",

      parts: [{ text: userMessage }],

    });

    history.push({

      role: "model",

      parts: [{ text: response }],

    });

    // Keep only last 10 conversations

    if (history.length > 20) {

      history.splice(0, 2);

    }

  }
}

startChat();