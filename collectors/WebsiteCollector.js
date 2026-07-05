import axios from "axios";
import * as cheerio from "cheerio";
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
// Website Collector
// ===============================

async function collectWebsite() {
  try {
    const persona = await choosePersona();

    const websiteUrl = await ask("\nPaste Website URL: ");

    console.log("\nDownloading Website...\n");

    const response = await axios.get(websiteUrl);

    const $ = cheerio.load(response.data);

    // Try to extract only important content
    let websiteText = $("main").text().trim();

    if (!websiteText) {
      websiteText = $("article").text().trim();
    }

    if (!websiteText) {
      websiteText = $("body").text().trim();
    }

    // Remove extra spaces
    websiteText = websiteText.replace(/\s+/g, " ");

    const folderPath = `data/${persona}/website`;

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const title =
      $("title").text().replace(/[<>:"/\\|?*]/g, "").trim() || "website";

    fs.writeFileSync(
      path.join(folderPath, `${title}.txt`),
      websiteText,
      "utf8"
    );

    console.log("✅ Website Saved Successfully!");
    console.log(path.join(folderPath, `${title}.txt`));

  } catch (error) {
    console.log("\n❌ Error:", error.message);
  } finally {
    rl.close();
  }
}

collectWebsite();