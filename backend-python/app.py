import cohere  # Cohere API for AI chat functionality
import os  # To access environment variables
from fastapi import FastAPI  # FastAPI framework for building APIs
from pydantic import BaseModel  # Pydantic for request validation
from dotenv import load_dotenv  # Load environment variables from .env file

# Load API key from .env file
load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")

# Initialize Cohere client
co = cohere.ClientV2(COHERE_API_KEY)

# Initialize FastAPI app
app = FastAPI()

# Request Model (Schema)
# - Defines the structure of incoming chatbot requests.
# - `prompt` (str): The user's input message.
# - FastAPI ensures validation, allowing only string inputs.
class Prompt(BaseModel):
    prompt: str
    
# API route for chatbot
@app.post("/chat")
def chat_response(data: Prompt):
    response = co.chat(
        model="command-a-03-2025",
        messages=[{"role": "user", "content": data.prompt}]
    )   

    # Return the entire response JSON including `id`
    return response.dict()  # Converts response object to a dictionary


# import cohere
# import os
# from fastapi import FastAPI
# from pydantic import BaseModel
# from dotenv import load_dotenv

# # Load API key from .env file
# load_dotenv()
# COHERE_API_KEY = os.getenv("COHERE_API_KEY")

# # Initialize Cohere
# co = cohere.Client(COHERE_API_KEY)

# # Initialize FastAPI app
# app = FastAPI()

# # Request model
# class Prompt(BaseModel):
#     prompt: str

# # API route for chatbot
# @app.post("/chat")
# def chat_response(data: Prompt):
#     response = co.chat(message=data.prompt)
#     return {"response": response.text
