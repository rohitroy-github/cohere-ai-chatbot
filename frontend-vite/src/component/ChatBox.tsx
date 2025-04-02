import React, { useState } from "react";
import { sendMessage } from "../api/api";
import Message from "./Message";
import FileUpload from "./FileUpload";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" as const };
    setMessages((prev) => [...prev, userMessage]);

    const botResponse = await sendMessage(input);
    setMessages((prev) => [...prev, { text: botResponse, sender: "bot" as const }]);

    setInput("");
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-lg p-4">
      <h1 className="text-xl font-bold text-center">Chatbot</h1>
      <div className="h-64 overflow-y-auto flex flex-col p-2 border">
        {messages.map((msg, idx) => (
          <Message key={idx} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <div className="flex items-center mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-md p-2"
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md">
          Send
        </button>
      </div>
      <FileUpload />
    </div>
  );
};

export default ChatBox;
