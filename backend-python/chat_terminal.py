import requests  # For making API requests
import json  # For handling JSON data
import os  # To check if the file exists
from datetime import datetime  # Import datetime for timestamps


SERVER_URL = "http://127.0.0.1:8000/chat"
LOG_FILE = "chat_history.json"  # JSON file to store chat history

# Load existing chat history if the file exists otherwise create a new list
if os.path.exists(LOG_FILE):
    with open(LOG_FILE, "r", encoding="utf-8") as file:
        try:
            chat_history = json.load(file)  # Load existing JSON data
        except json.JSONDecodeError:
            chat_history = []  # Start fresh if JSON is corrupted
else:
    chat_history = []  # Initialize an empty list for new chats

print("Chatbot (type 'exit' to quit, type 'history' to view past 5 messages)")

while True:
    user_input = input("You: ")

    if user_input.lower() == "exit":
        print("Goodbye!")
        break  # Exit loop if the user types 'exit'

    if user_input.lower() == "history":
        if chat_history:
            print("\n--- Chat History (Last 5 Messages) ---")
            for chat in chat_history[-5:]:  # Show last 5 messages
                print(f"You: {chat['user']}\nBot: {chat['bot']}\n")
            print("--------------------------------------\n")
        else:
            print("No chat history available.")
        continue  # Skip API request for "history" command

    try:
        response = requests.post(SERVER_URL, json={"prompt": user_input})

        if response.status_code == 200:
            bot_response = response.json()["response"]
            print("Bot:", bot_response)  # Print chatbot response

            # Append the new conversation to history
            chat_history.append({"user": user_input, "bot": bot_response, "timestamp": datetime.now().isoformat(),})

            # Write the updated history to the JSON file
            with open(LOG_FILE, "w", encoding="utf-8") as file:
                json.dump(chat_history, file, indent=4, ensure_ascii=False)

        else:
            print("Error:", response.text)  # Handle API errors

    except requests.exceptions.RequestException as e:
        print("Connection error:", e)  # Handle network errors
        break
