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
    <div className="flex items-center space-x-2">
      <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" id="file-upload" />
      
      <label htmlFor="file-upload" className="bg-gray-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-600">
        📄 Upload PDF
      </label>

      {selectedFile && (
        <button onClick={handleUpload} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400">
          Upload
        </button>
      )}
    </div>
  );
};

export default FileUpload;
