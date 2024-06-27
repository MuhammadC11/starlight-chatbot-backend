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

const messages = [];

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  const apiKey = "YOUR_GOOGLE_GEMINI_API_KEY"; // Replace with your actual API key

  try {
    const response = await axios.post(
      "https://gemini-api-endpoint-url",
      {
        prompt: `You are a chatbot that answers questions about famous landmarks. ${message}`,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ answer: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
