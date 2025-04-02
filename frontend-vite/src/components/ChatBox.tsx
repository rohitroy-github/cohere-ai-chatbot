import React, { useState } from "react";
import axios from "axios";
import { useDropzone, Accept } from "react-dropzone";  // Import Accept from react-dropzone
import Message from "./Message";

interface ChatMessage {
  text: string;
  sender: "user" | "assistant";
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  // Handle sending messages
  const sendMessage = async () => {
    if (!input.trim() && !pdfFile) return;

    const newUserMessage: ChatMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    const formData = new FormData();

    // If PDF is uploaded, append it to the form data
    if (pdfFile) {
      formData.append("file", pdfFile);
    }

    // Append user input text to the form data
    if (input.trim()) {
      formData.append("prompt", input);
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const botMessage: ChatMessage = {
        text: response.data.message.content[0].text,
        sender: "assistant",
      };
      setMessages((prev) => [...prev, botMessage]);

      // Reset the PDF file after sending
      setPdfFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handling the PDF file selection
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setPdfFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf" as Accept, // Use Accept type explicitly here
    onDrop,
  });

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto border rounded-lg shadow-lg font-montserrat">
      <div className="flex flex-col flex-grow p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <div className="flex items-center p-3 border-t">
        {/* Text Input */}
        <input
          type="text"
          className="flex-grow p-2 border rounded-lg"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={sendMessage}>
          Send
        </button>
      </div>

      {/* PDF File Upload */}
      <div className="p-3 border-t">
        <div {...getRootProps()} className="cursor-pointer">
          <input {...getInputProps()} />
          <p className="text-sm text-gray-500">Drag & drop a PDF file here or click to select a file</p>
        </div>
        {pdfFile && (
          <div className="mt-2">
            <p className="text-sm font-semibold">Selected PDF: {pdfFile.name}</p>
            <button
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={() => setPdfFile(null)} // Clear selected PDF
            >
              Remove PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
