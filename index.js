const movieUtils = require("./utils/movie.utils");
const moviesApi = require("./api/movies.api");
const bot = require("./utils/bot.utils");

const express = require("express");

const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.on("message", async (msg) => {
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
