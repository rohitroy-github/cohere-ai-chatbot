# Cohere Chatbot

**Cohere Chatbot** is a FastAPI-based chatbot application that integrates Cohere's AI API to generate intelligent responses. It maintains a short-term conversation history for a more contextual chat experience.

---

## Features

- **Chat Functionality**: Communicate with the AI model via a RESTful API.
- **Conversation History**: Stores the last five messages to provide context-aware responses.
- **FastAPI Integration**: A lightweight, high-performance backend.
- **Environment Variable Support**: API keys are securely managed using a `.env` file.
- **Pydantic Validation**: Ensures that user input is correctly formatted.
- **Minimal Memory Usage**: Maintains only recent messages to optimize performance.

---

## Snapshots


| ![Macbook-Air-localhost](https://github.com/user-attachments/assets/a1e4c9ac-c186-40c8-8ee5-5afe6bc5f82e) | ![Macbook-Air-localhost (1)](https://github.com/user-attachments/assets/93199e44-daf1-434f-a29d-8c523bb83ea4) |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| ![Macbook-Air-localhost (2)](https://github.com/user-attachments/assets/79afceac-6a50-4d73-97dc-6d6c531ed279) |  |

---

## Tech Stack

- **Backend**: FastAPI  
- **AI Integration**: Cohere API  
- **Environment Management**: dotenv  
- **Validation**: Pydantic  
- **Server**: Uvicorn  

---

## Getting Started

### Prerequisites

- **Python**: 3.10 or higher  
- **FastAPI**: Installed  
- **Cohere API Key**: Get from [Cohere's official website](https://cohere.com/)  
- **Postman or Curl**: To test API requests  
