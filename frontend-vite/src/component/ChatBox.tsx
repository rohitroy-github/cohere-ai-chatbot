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
<div className="w-full max-w-xl mx-auto bg-white shadow-2xl rounded-2xl p-5 font-montserrat">
  {/* Chat Header */}
  <h1 className="text-2xl font-bold text-center mb-3 text-gray-800">Chatbot</h1>

  {/* Chat Messages */}
  <div className="h-80 overflow-y-auto flex flex-col p-3 border rounded-lg bg-gray-100 space-y-3">
    {messages.map((msg, idx) => (
      <div
        key={idx}
        className={`p-3 max-w-[75%] rounded-lg ${
          msg.sender === "user"
            ? "bg-blue-500 text-white self-end"
            : "bg-gray-300 text-gray-800 self-start"
        }`}
      >
        {msg.text}
      </div>
    ))}
  </div>

  {/* Message Input */}
  <div className="flex items-center mt-3 bg-gray-50 p-2 rounded-lg shadow-md font-montserrat">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type a message..."
      className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
    />
    <button
      onClick={handleSend}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 ml-3 rounded-lg shadow-lg transition-all"
    >
      Send
    </button>
  </div>

  {/* File Upload */}
  <div className="mt-3">
    <FileUpload />
  </div>
</div>

  );
};

export default ChatBox;
