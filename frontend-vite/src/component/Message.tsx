import React from "react";

interface MessageProps {
  text: string;
  sender: "user" | "bot";
}

const Message: React.FC<MessageProps> = ({ text, sender }) => {
  return (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"} w-full`}>
      <div
        className={`p-2.5 rounded-lg shadow-md max-w-xs md:max-w-md lg:max-w-lg text-xs ${
          sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-700 text-gray-200"
        }`}
        style={{ maxWidth: `${Math.min(text.length * 8 + 50, 500)}px` }} // Dynamic width based on text length
      >
        {text}
      </div>
    </div>
  );
};

export default Message;
