import React from "react";

interface MessageProps {
  text: string;
  sender: "user" | "bot";
}

const Message: React.FC<MessageProps> = ({ text, sender }) => {
  return (
    <div className={`p-2 m-1 rounded-lg ${sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"}`}>
      {text}
    </div>
  );
};

export default Message;
