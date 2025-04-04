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

| ![image](https://user-images.githubusercontent.com/68563695/226727488-a623230a-3015-4b4d-88ea-83027651a59b.JPG) | ![image](https://user-images.githubusercontent.com/68563695/189517297-777899f1-2abd-462d-9848-65d098bec292.png) |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| ![dummy-image](https://via.placeholder.com/350) | ![dummy-image](https://via.placeholder.com/350) |

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
