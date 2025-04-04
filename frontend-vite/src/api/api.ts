import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // Change if backend is running elsewhere

export const sendMessage = async (message: string) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { prompt: message });
    return response.data.message.content[0].text;
  } catch (error) {
    console.error("Error sending message:", error);
    return "Error: Unable to communicate with the chatbot.";
  }
};

export const uploadPDF = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URL}/upload-pdf`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.message;
  } catch (error) {
    console.error("Error uploading PDF:", error);
    return "Error: Unable to upload the file.";
  }
};
