const movieUtils = require("./utils/movie.utils");

const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const app = express();
app.use(express.json());

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
const WEBHOOK_URL = `https://${process.env.VERCEL_URL}/`;

// Set the webhook
bot.setWebHook(WEBHOOK_URL);

app.post("/", (req, res) => {
  bot.processUpdate(req.body); // Pass incoming updates to the bot
  res.sendStatus(200);
});

// bot.onText(/\/start/, (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(
//     chatId,
//     `${msg.from.first_name || "there"}! You said: "${msg.text}"`
//   );
// });

bot.on("message", (msg) => {
  const chatId = msg.chat.id; // Get the chat ID of the message sender
  const userMessage = msg.text; // Get the text sent by the user

  movieUtils.handleCommands(msg);

  bot.sendMessage(
    chatId,
    `Hello, ${msg.from.first_name || "there"}! You said: "${userMessage}"`
  );
});

console.log("Bot is running...");
module.exports = app;
