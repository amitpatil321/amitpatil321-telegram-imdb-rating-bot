const movieUtils = require("./utils/movie.utils");
const moviesApi = require("./api/movies.api");
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

bot.on("callback_query", async (callbackQuery) => {
  const { data: movieId, message } = callbackQuery;
  const chatId = message.chat.id;
  try {
    const movieDetail = await moviesApi.getMovieById(movieId);
    const movie = movieDetail.data;
    await movieUtils.sendMovieDetails(movie, message);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    await bot.sendMessage(chatId, "Failed to fetch movie details!");
  }

  bot.answerCallbackQuery(callbackQuery.id);
});

console.log("Bot is running...");
module.exports = app;
