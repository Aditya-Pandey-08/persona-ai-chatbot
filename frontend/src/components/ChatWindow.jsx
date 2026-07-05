import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";

import { sendMessage } from "../services/api";

export default function ChatWindow({ selectedPersona }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // Auto Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Clear chat when persona changes
  useEffect(() => {
    setMessages([]);
    setMessage("");
  }, [selectedPersona]);

  // No Persona Selected
  if (!selectedPersona) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#313338]">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-5">
            🤖 Persona AI
          </h1>

          <p className="text-gray-400 text-xl">
            Select an Instructor from the left sidebar
          </p>
        </div>
      </div>
    );
  }

  // Send Message
  async function handleSend() {
    if (!message.trim()) return;

    const currentMessage = message;

    // Add User Message
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const history = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      const data = await sendMessage({
        persona: selectedPersona,
        message: currentMessage,
        history,
      });

      // Add AI Response
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.response,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="flex-1 flex flex-col bg-[#313338]">

      <ChatHeader selectedPersona={selectedPersona} />

      <ChatBody
        messages={messages}
        loading={loading}
        selectedPersona={selectedPersona}
      />

      <div ref={bottomRef}></div>

      <ChatInput
        message={message}
        setMessage={setMessage}
        handleSend={handleSend}
        loading={loading}
      />

    </div>
  );
}