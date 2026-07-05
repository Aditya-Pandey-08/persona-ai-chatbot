import { google } from "googleapis";
import readline from "readline";
import dotenv from "dotenv";
import { YoutubeTranscript } from "youtube-transcript";
import fs from "fs";
import path from "path";

dotenv.config();

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

1. Hitesh Choudhary
2. Piyush Garg

Enter your choice: `);

  if (choice === "1") {
    return "hitesh";
  }

  if (choice === "2") {
    return "piyush";
  }

  console.log("❌ Invalid Choice");
  process.exit();
}

async function askVideoCount() {
    const count = await ask("\nHow many latest videos do you want to download? ");
  
    const number = parseInt(count);
  
    if (isNaN(number) || number <= 0) {
      console.log("❌ Please enter a valid number.");
      process.exit();
    }
  
    return number;
  }
// ===============================
// Channel IDs
// ===============================

const channels = {
  hitesh: "UCXgGY0wkgOzynnHvSEVmE3A",
  piyush: "UCf9T51_FmMlfhiGpoes0yFA",
};

// ===============================
// YouTube API
// ===============================

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

// ===============================
// Fetch Videos
// ===============================

async function getVideos() {
  try {
    const persona = await choosePersona();
    const videoCount = await askVideoCount();

    const response = await youtube.search.list({
      key: process.env.YOUTUBE_API_KEY,
      part: ["snippet"],
      channelId: channels[persona],
      maxResults: videoCount,
      order: "date",
      type: ["video"],
    });

    const videos = response.data.items;
    const folderPath = `data/${persona}/youtube`;

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    
    for (const video of videos) {
      try {
        const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
    
        console.log(`\n⬇ Downloading: ${video.snippet.title}`);
    
        const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
    
        const transcriptText = transcript
          .map(item => item.text)
          .join("\n");
    
        const fileName = `${video.snippet.title}`
          .replace(/[<>:"/\\|?*]/g, "")
          .trim() + ".txt";
    
        fs.writeFileSync(
          path.join(folderPath, fileName),
          transcriptText,
          "utf8"
        );
    
        console.log(`✅ Saved: ${fileName}`);
    
      } catch (err) {
        console.log(`❌ Transcript not available for: ${video.snippet.title}`);
      }
    }

console.log("\n✅ Transcript Saved Successfully!");
console.log(path.join(folderPath, fileName));

    // Close readline AFTER everything is finished
    rl.close();

  } catch (error) {
    console.error("Error:", error.message);
    rl.close();
  }
}

getVideos();