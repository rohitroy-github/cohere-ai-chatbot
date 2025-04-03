import React, { useState } from "react";
import { uploadPDF } from "../api/api";

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    // Reset file input value to allow re-selecting the same file
    const fileInput = document.getElementById("file-upload") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const response = await uploadPDF(selectedFile);
      alert(response); // Notify user
      setSelectedFile(null);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" id="file-upload" />
      
      <label htmlFor="file-upload" className="bg-gray-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-600">
        {selectedFile ? selectedFile.name : "📄 Upload PDF"}
        {selectedFile && (
        <>
          <button onClick={handleRemoveFile} className="ml-2 text-red-400 hover:text-red-300">
            ❌
          </button>
        </>
      )}
      </label>
    </div>
  );
};

export default FileUpload;