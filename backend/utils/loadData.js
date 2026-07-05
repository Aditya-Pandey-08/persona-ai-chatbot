import fs from "fs";
import path from "path";

// ===============================
// Read all txt files recursively
// ===============================

function readFolder(folderPath) {
  let content = "";

  if (!fs.existsSync(folderPath)) {
    return content;
  }

  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);

    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      content += readFolder(filePath);
    } else {
      if (file.endsWith(".txt") || file.endsWith(".md")) {
        content += fs.readFileSync(filePath, "utf8");
        content += "\n\n";
      }
    }
  }

  return content;
}

// ===============================
// Load Persona Data
// ===============================
export function loadData(persona) {

  console.log("loadData persona:", persona);
  console.log("typeof persona:", typeof persona);

  const basePath = path.join("data", persona);

  return readFolder(basePath);
}