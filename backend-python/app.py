import cohere
import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")

# Initialize Cohere client
co = cohere.ClientV2(COHERE_API_KEY)

# Initialize FastAPI app
app = FastAPI()

# Request model
class Prompt(BaseModel):
    prompt: str

# API route for chatbot
@app.post("/chat")
def chat_response(data: Prompt):
    response = co.chat(
        model="command-a-03-2025",
        messages=[{"role": "user", "content": data.prompt}]
    )

    # Extract text content properly
    if response.message and response.message.content:
        bot_reply = response.message.content[0].text
    else:
        bot_reply = "Sorry, I couldn't generate a response."

    return {"response": bot_reply}


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
