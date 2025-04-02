import React, { useState } from "react";
import { uploadPDF } from "../api/api";

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const response = await uploadPDF(selectedFile);
      alert(response); // Notify user
      setSelectedFile(null);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <input type="file" accept="application/pdf" onChange={handleFileChange} className="border p-2" />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Upload PDF
      </button>
    </div>
  );
};

export default FileUpload;
