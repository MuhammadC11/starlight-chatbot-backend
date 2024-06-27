# Starlight Chatbot Backend

This repository contains the backend for the Starlight Chatbot, a simple AI-powered chatbot that answers generic questions about famous landmarks. The backend is built using Node.js and Express, and it leverages the Google Generative AI API to provide intelligent responses.

## Table of Contents

- [Starlight Chatbot Backend](#starlight-chatbot-backend)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [POST /chat](#post-chat)
    - [GET /messages](#get-messages)
    - [POST /clear](#post-clear)
  - [Project Structure](#project-structure)
  - [Approach and Challenges](#approach-and-challenges)

## Project Overview

The Starlight Chatbot Backend serves as the server-side component of the chatbot, handling user requests and interacting with the Google Generative AI API to generate responses.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v20 or higher)
- npm (v6 or higher)
- Google Generative AI API Key

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/MuhammadC11/starlight-chatbot-backend.git
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your Google Generative AI API key:
    ```
    GOOGLE_GEMINI_API_KEY=your_api_key_here
    ```

4. Start the server:
    ```bash
    node index.js
    ```

    The server should now be running on `http://localhost:5001`.

## Usage

To interact with the chatbot, you can send HTTP requests to the server using tools like Postman, curl, or through the frontend application. In our case, its our front end application that should be running while this server is running
## API Endpoints

### POST /chat

This endpoint receives a user's message, forwards it to the Google Generative AI API, and returns the chatbot's response.

- **URL**: `/chat`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
      "message": "Your question here"
    }
    ```
- **Response**:
    ```json
    {
      "answer": "The chatbot's response",
      "messages": [
        {
          "role": "user",
          "parts": [
            { "text": "Your question here" }
          ]
        },
        {
          "role": "model",
          "parts": [
            { "text": "The chatbot's response" }
          ]
        }
      ]
    }
    ```

### GET /messages

This endpoint returns the chat history.

- **URL**: `/messages`
- **Method**: `GET`
- **Response**:
    ```json
    [
      {
        "role": "user",
        "parts": [
          { "text": "Your previous question" }
        ]
      },
      {
        "role": "model",
        "parts": [
          { "text": "Previous chatbot's response" }
        ]
      }
    ]
    ```

### POST /clear

This endpoint resets the chat history to start a new conversation.

- **URL**: `/clear`
- **Method**: `POST`
- **Response**:
    ```json
    { "message": "Chat cleared" }
    ```

## Project Structure

starlight-chatbot-backend/
├── node_modules/
├── .env
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md


## Approach and Challenges

The backend implementation started with setting up an Express server and configuring middleware such as `body-parser` for parsing incoming requests and `cors` for handling cross-origin resource sharing. A `.env` file was used to securely manage the Google Generative AI API key.

The chatbot functionality was implemented using the `@google/generative-ai` package. I used the `gemini-1.5-pro` model for generating responses.

A key challenge was ensuring that the chat history was maintained across multiple requests. This was handled using a `messages` array.

The first challenge I ran into was a silly mistake on my part, I named the .env file as variables.env and for some reason, the server could not load a file named like that so when I finally realized after console logging the key, I changed it to just .env. After that the main challenge was the prompt engineering for the bot, I had to set some rules and what the users can ask and what they can't. I had to ensure that users couldn't override the first default prompt given to the bot. I also didn't want the text coming out with markdown format as it did not look good so I specified that in the prompt but the bot still ignores that from time to time.

Additional challenges included handling special characters in the chatbot's responses and ensuring that the chat history could be reset to start a new conversation. These issues were addressed through string manipulation and implementing a `/clear` endpoint.

