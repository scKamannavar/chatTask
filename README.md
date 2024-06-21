  chatTask README

chatTask
========

This is a simple chat application built with React for the frontend and Node.js for the backend. The application allows users to send messages and receive automated responses from the bot.

Table of Contents
-----------------

*   [Installation](#installation)
*   [Backend Setup](#backend-setup)
*   [Frontend Setup](#frontend-setup)
*   [Backend Code Logic](#backend-code-logic)
*   [Frontend Code Logic](#frontend-code-logic)
*   [Note on Responses](#note-on-responses)

Installation
------------

Before you begin, ensure you have the following installed:

*   Node.js (v14 or higher)
*   npm (v6 or higher)

Backend Setup
-------------

1.  **Clone the repository:**
    
        git clone https://github.com/scKamannavar/chatTask.git
        cd chatTask/server
                    
    
2.  **Install dependencies:**
    
        npm install
    
3.  **Run the backend server:**
    
        npm start
    

Backend Code Logic
------------------

*   The backend is a simple Express server.
*   The endpoint `/api/messages` handles incoming POST requests with the user message.
*   The `addMessage` function processes the message and returns an appropriate response.

Frontend Setup
--------------

1.  **Navigate to the frontend directory:**
    
        cd chatTask/client
    
2.  **Install dependencies:**
    
        npm install
    
3.  **Run the frontend server:**
    
        npm run dev
    

Frontend Code Logic
-------------------

*   The frontend is built using React.
*   The main components are `ChatScreen`, `Header`, `InputContainer`, `Conversation`, `MyMessage`, and `BotMessage`.
*   `ChatScreen` handles the overall layout and state management.
*   `InputContainer` captures user input and sends messages to the backend.
*   `Conversation` displays the chat history.

Note on Responses
-----------------

For now, you will get a response only for messages 'Hi', 'Hello', and 'Good morning'. For other messages, a default message will be displayed.
