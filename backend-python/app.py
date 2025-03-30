import cohere
import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")

# Initialize Cohere
co = cohere.Client(COHERE_API_KEY)

# Initialize FastAPI app
app = FastAPI()

# Request model
class Prompt(BaseModel):
    prompt: str

# API route for chatbot
@app.post("/chat")
def chat_response(data: Prompt):
    response = co.chat(message=data.prompt)
    return {"response": response.text}
