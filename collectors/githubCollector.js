import axios from "axios";
import readline from "readline";
import fs from "fs";
import path from "path";

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
Choose Persona

1. Hitesh
2. Piyush

Enter Choice: `);

  if (choice === "1") return "hitesh";
  if (choice === "2") return "piyush";

  console.log("❌ Invalid Choice");
  process.exit();
}

// ===============================
// GitHub Collector
// ===============================

async function collectGithub() {
  try {
    // Ask Persona
    const persona = await choosePersona();

    // Ask Repository URL
    const repoUrl = await ask("\nPaste GitHub Repository URL: ");

    // Example:
    // https://github.com/piyushgarg-dev/nodejs-course

    const parts = repoUrl.split("/");

    const owner = parts[3];
    const repo = parts[4];

    console.log("\nDownloading README...\n");

    // Fetch README
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          Accept: "application/vnd.github.raw",
        },
      }
    );

    // Create Folder
    const folderPath = `data/${persona}/github`;

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Save README
    fs.writeFileSync(
      path.join(folderPath, `${repo}.md`),
      response.data,
      "utf8"
    );

    console.log("✅ README Saved Successfully!");
    console.log(path.join(folderPath, `${repo}.md`));

  } catch (error) {
    console.log("\n❌ Error:", error.message);
  } finally {
    rl.close();
  }
}

// ===============================
// Run
// ===============================

collectGithub();