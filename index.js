const movieUtils = require("./utils/movie.utils");
const bot = require("./utils/bot.utils");

const express = require("express");

const app = express();
app.use(express.json());

// const WEBHOOK_URL = `https://${process.env.VERCEL_URL}/`;
const WEBHOOK_URL = `https://54bc-2a09-bac1-36a0-f0-00-3b7-18.ngrok-free.app/`;

// Set the webhook
bot.setWebHook(WEBHOOK_URL);

app.post("/", (req, res) => {
  bot.processUpdate(req.body); // Pass incoming updates to the bot
  res.sendStatus(200);
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id; // Get the chat ID of the message sender
  const userMessage = msg.text; // Get the text sent by the user

  await movieUtils.handleCommands(msg);
});

console.log("Bot is running...");
module.exports = app;
