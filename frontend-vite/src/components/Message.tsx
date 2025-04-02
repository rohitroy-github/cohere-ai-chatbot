import React from "react";

interface MessageProps {
  text: string;
  sender: "user" | "assistant";
  fileUrl?: string; // Optional prop to handle PDF file URL
}

const Message: React.FC<MessageProps> = ({ text, sender, fileUrl }) => {
  return (
    <div className={`font-montserrat flex ${sender === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 m-2 max-w-xs rounded-lg ${sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
      >
        {/* If there's a file URL (PDF), show a link to the PDF */}
        {fileUrl ? (
          <div>
            <p className="text-sm font-semibold text-blue-500">
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                Click here to view the PDF
              </a>
            </p>
          </div>
        ) : null}

        {/* Display the text message */}
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Message;
