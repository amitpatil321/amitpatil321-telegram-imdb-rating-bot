const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const app = express();
app.use(express.json()); // To parse JSON from Telegram webhook requests

const TOKEN = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(TOKEN);

// Replace with your Vercel deployment URL
const WEBHOOK_URL = `https://${process.env.VERCEL_URL}/api/bot`;

// Set the webhook
bot.setWebHook(WEBHOOK_URL);

app.post("/api/bot", (req, res) => {
  bot.processUpdate(req.body); // Pass incoming updates to the bot
  res.sendStatus(200);
});

// Define bot behavior
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Hello, ${msg.from.first_name || "there"}!`);
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `You said: "${msg.text}"`);
});

// Export the app for Vercel
module.exports = app;
