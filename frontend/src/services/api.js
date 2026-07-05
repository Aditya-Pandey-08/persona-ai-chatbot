import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export async function sendMessage(data) {
  const response = await API.post("/chat", data);
  return response.data;
}