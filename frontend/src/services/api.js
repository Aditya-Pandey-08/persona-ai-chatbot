import axios from "axios";

const API = axios.create({
  baseURL: "https://persona-ai-chatbot.onrender.com",
});

export async function sendMessage(data) {
  const response = await API.post("/chat", data);
  return response.data;
}