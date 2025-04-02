import cohere  # Cohere API for AI chat functionality
import os  # Access environment variables
import fitz  # PyMuPDF for extracting text from PDFs
from fastapi import FastAPI, File, UploadFile, HTTPException
from io import BytesIO  # Handle in-memory file processing
from pydantic import BaseModel
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")

# Initialize Cohere client
co = cohere.ClientV2(COHERE_API_KEY)

# Initialize FastAPI app
app = FastAPI()

# Store conversation history and PDF content globally
chat_history = []  # Keeps last 5 messages
pdf_content = ""  # Stores extracted text from uploaded PDF


# Request Model (Schema)
class Prompt(BaseModel):
    prompt: str


# Extracts text from a PDF file provided as bytes.
# Uses `fitz.open` to read the PDF from memory and retrieve text from all pages.
# Returns the extracted text or an error message if no text is found.
def extract_text_from_pdf(file_data: bytes) -> str:
    try:
        doc = fitz.open(stream=BytesIO(file_data), filetype="pdf")  # Read PDF from memory
        text = "\n".join([page.get_text("text") for page in doc])

        if not text.strip():
            raise ValueError("No extractable text found in the PDF.")

        return text.strip()

    except Exception as e:
        return f"Error extracting text from pdf: {str(e)}"


# Handles PDF file upload, extracts text, and stores it for chat context.
# Only allows PDF files and returns an error if extraction fails.
@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    global pdf_content

    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    file_data = await file.read()  # Read file into memory

    extracted_text = extract_text_from_pdf(file_data)

    if extracted_text.startswith("Error"):
        raise HTTPException(status_code=500, detail=extracted_text)

    pdf_content = extracted_text  # Store extracted text

    return {"message": "PDF uploaded successfully", "extracted_text": pdf_content[:100]}  # Show first 100 chars

# API route for chatbot
@app.post("/chat")
def chat_response(data: Prompt):
    global chat_history, pdf_content  

    # Add user's query to chat history
    chat_history.append({"role": "user", "content": data.prompt})

    # Keep only the last 5 messages (to avoid excessive memory usage)
    if len(chat_history) > 5:
        chat_history.pop(0)  # Remove oldest message

    # Include extracted PDF content in the context if available
    context_messages = [{"role": "user", "content": "Here is relevant document information:\n" + pdf_content}] if pdf_content else []
    context_messages.extend(chat_history)

    response = co.chat(
        model="command-a-03-2025",
        messages=context_messages  # Provide chat history + extracted PDF text
    )   

    # Store bot's response in history
    bot_response = {"role": "assistant", "content": response.message.content[0].text}
    chat_history.append(bot_response)

    return response.dict()  # Converts response object to a dictionary
