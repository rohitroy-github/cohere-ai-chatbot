# Cohere Chatbot

**Cohere Chatbot** is a FastAPI-based chatbot application that integrates Cohere's AI API to generate intelligent responses. It maintains a short-term conversation history for a more contextual chat experience.

## Features

- **Chat Functionality**: Communicate with the AI model via a RESTful API.
- **Conversation History**: Stores the last five messages to provide context-aware responses.
- **FastAPI Integration**: A lightweight, high-performance backend.
- **Environment Variable Support**: API keys are securely managed using a `.env` file.
- **Pydantic Validation**: Ensures that user input is correctly formatted.
- **Minimal Memory Usage**: Maintains only recent messages to optimize performance.

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
