import React from "react";
import ChatBox from "../components/ChatBox";

const ChatPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="mb-4 text-xl font-bold font-montserrat">Chatbot</h1>
      <ChatBox />
    </div>
  );
};

export default ChatPage;
