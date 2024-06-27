require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 5001;
const { GoogleGenerativeAI } = require("@google-generative-ai");

app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const messages = []; // In-memory storage for messages

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

  messages.push({ role: "user", text: "" });

  try {
    const chat = model.startChat({
      history: messages,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = await response.text();

    messages.push({ role: "model", text });
    res.json({ answer: text, messages });
    console.log(text);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
