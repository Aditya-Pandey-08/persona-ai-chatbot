import readline from "readline";
import fs from "fs";
import path from "path";
import { YoutubeTranscript } from "youtube-transcript";

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
=================================
 Single Video Transcript Collector
=================================

Choose Persona

1. Hitesh Choudhary
2. Piyush Garg

Enter Choice: `);

  if (choice === "1") return "hitesh";
  if (choice === "2") return "piyush";

  console.log("❌ Invalid Choice");
  process.exit();
}

// ===============================
// Collect Transcript
// ===============================

async function collectTranscript() {
  try {
    const persona = await choosePersona();

    const videoUrl = await ask("\nPaste YouTube Video URL: ");

    console.log("\n⬇ Downloading Transcript...\n");

    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);

    const transcriptText = transcript
      .map(item => item.text)
      .join("\n");

    const title =
      await ask("\nEnter filename (without .txt): ");

    const folderPath = `data/${persona}/youtube`;

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    fs.writeFileSync(
      path.join(folderPath, `${title}.txt`),
      transcriptText,
      "utf8"
    );

    console.log("\n✅ Transcript Saved Successfully!");
    console.log(path.join(folderPath, `${title}.txt`));

  } catch (error) {
    console.log("\n❌ Error:", error.message);
  } finally {
    rl.close();
  }
}

collectTranscript();