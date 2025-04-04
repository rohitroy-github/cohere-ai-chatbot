import React, { useState } from "react";
import FileUpload from "./FileUpload";
import Message from "./Message";
import axios from "axios";
import { uploadPDF } from "../api/api";

type MessageType = {
  text: string;
  sender: "user" | "bot";
};

const Chatbox: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isTestingMode, setIsTestingMode] = useState(false);

  const handleUpload = async () => {
    if (selectedFile) {
      await uploadPDF(selectedFile);
      console.log(">>> file uploaded:", selectedFile);
      setSelectedFile(null);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: MessageType = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    if (isTestingMode) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Testing mode is enabled, so it's not me talking :))",
          sender: "bot",
        },
      ]);
    } else {
      try {
        await Promise.all([
          handleUpload(), // Upload file (if selected)
          // axios.post("http://localhost:8000/chat", { prompt: input }).then((response) => {
          //   setMessages((prev) => [
          //     ...prev,
          //     { text: response.data.message, sender: "bot" },
          //   ]);
          // }),
          axios
            .post("http://localhost:8000/chat", { prompt: input })
            .then((response) => {
              // console.log(
              //   "API Response:",
              //   response.data.message.content[0].text
              // ); // Log the actual API response

              // Extract the bot's reply text from the response object
              const botReply = response.data.message.content[0].text;

              setMessages((prev) => [
                ...prev,
                { text: botReply, sender: "bot" },
              ]);
            }),
        ]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          { text: "Error reaching server", sender: "bot" },
        ]);
      }
    }

    setInput("");
  };

  return (
    <div className="h-screen bg-gray-900 w-full relative">
      <div className="h-screen flex flex-col bg-gray-900 text-white w-full px-4 md:px-32 relative container mx-auto">
        {/* Header */}
        <div className="p-5 border-b border-gray-700 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Cohere ChatBOT</h1>

          {/* Toggle Switch for Testing Mode */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <span className="text-sm">Testing Mode</span>

            <input
              type="checkbox"
              checked={isTestingMode}
              onChange={() => setIsTestingMode(!isTestingMode)}
              className="hidden"
            />

            <div
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                isTestingMode ? "bg-blue-600" : "bg-gray-500"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  isTestingMode ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </div>
          </label>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <Message key={idx} text={msg.text} sender={msg.sender} />
          ))}
        </div>

        {/* Floating Input Bar */}
        <div className="absolute bottom-5 left-0 w-full flex flex-col items-center px-4">
          <div className="p-3 border border-gray-600 rounded-xl shadow-lg bg-gray-800 flex items-center md:space-x-1 space-x-2 max-w-3xl w-full md:w-4/5 lg:w-3/5 md:text-sm">
          <FileUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} />

            {/* Auto-Expanding Textarea */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none resize-none overflow-hidden min-h-[40px] max-h-[120px] text-sm"
              rows={1}
              style={{
                height: input.length > 40 ? "auto" : "40px",
              }}
            />

            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
            >
              Send
            </button>
          </div>

          {/* Footer */}
          <p className="text-gray-400 text-xs mt-2">Powered by Cohere API</p>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
