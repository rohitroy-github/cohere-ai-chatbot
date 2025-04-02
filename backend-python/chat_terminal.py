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

def clear_history():
    #Clears the chat history and resets the log file without deleting it.
    global chat_history
    chat_history = []  # Reset the history list

    # Write the empty list to the JSON file to clear the history
    with open(LOG_FILE, "w", encoding="utf-8") as file:
        json.dump(chat_history, file, indent=4, ensure_ascii=False)

    print("Chat history cleared successfully.")

def show_history():
    """Displays the last 5 messages from chat history."""
    if chat_history:
        print("\n--- Chat History (Last 5 Messages) ---")
        for chat in chat_history[-5:]:  # Show last 5 messages
            print(f"ID: {chat['id']}\nYou: {chat['user']}\nBot: {chat['bot']}\n")
        print("--------------------------------------\n")
    else:
        print("No chat history available.")

print("Chatbot (type 'exit' to quit, type 'history' to view past 5 messages, type 'clear' to clear chat history)")

while True:
    user_input = input("You: ")

    if user_input.lower() == "exit":
        print("Goodbye!")
        break  # Exit loop if the user types 'exit'

    if user_input.lower() == "history":
        show_history()
        continue  # Skip API request for "history" command

    if user_input.lower() == "clear":
        clear_history()
        continue  # Skip API request for "clear" command

    try:
        # response = requests.post(SERVER_URL, json={"prompt": user_input})
        response = requests.post(SERVER_URL, json={"prompt": user_input}, timeout=10)

        if response.status_code == 200:
            response_data = response.json()
            bot_response_text = response_data["message"]["content"][0]["text"]
            bot_response_id = response_data["id"]

            print("System: Data sent successfully") # test_code
            
            print("Bot:", bot_response_text)

            # Append the new conversation to history
            chat_history.append({
                "id": bot_response_id,
                "user": user_input,
                "bot": bot_response_text,
                "timestamp": datetime.now().isoformat(),
            })

            # Write the updated history to the JSON file
            with open(LOG_FILE, "w", encoding="utf-8") as file:
                json.dump(chat_history, file, indent=4, ensure_ascii=False)

        else:
            print("Error:", response.text)  # Handle API errors

    except requests.exceptions.RequestException as e:
        print("Connection error:", e)  # Handle network errors
        break

    except requests.exceptions.ConnectionError:
        print("Server is down. Please start FastAPI first.")
        break  # Exit the loop if the server is not running
