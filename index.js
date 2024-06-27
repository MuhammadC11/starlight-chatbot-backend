require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let messages = []; // In-memory storage for messages

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (message === "") {
    messages = []; // Reset messages if a new chat is started
  } else {
    messages.push({
      role: "user",
      parts: [
        {
          text: "You are an AI Chatbot who is specialized in answering questions about famous landmarks in detail",
        },
      ],
    });

    try {
      const chat = model.startChat({
        history: messages,
        generationConfig: {
          maxOutputTokens: 500,
        },
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();

      messages.push({ role: "model", parts: [{ text }] });

      res.json({ answer: text, messages });
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  }
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
