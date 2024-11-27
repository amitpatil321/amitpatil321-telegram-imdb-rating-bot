const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const app = express();
app.use(express.json());

const TOKEN = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(TOKEN);

const WEBHOOK_URL = `https://${process.env.VERCEL_URL}/api/bot`;

bot.setWebHook(WEBHOOK_URL);

app.post("/api/bot", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Hello, ${msg.from.first_name || "there"}!`);
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `You said: "${msg.text}"`);
});

module.exports = app;
