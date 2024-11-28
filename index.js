const moviesController = require("../controller/movie.controller");
const bot = require("./controller/bot.controller");
const moviesApi = require("./api/movies.api");
const packageInfo = require("./package.json");

const express = require("express");

const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.get("/", function (req, res) {
  res.json({ version: packageInfo.version });
});

bot.on("message", async (message) => {
  const chatId = message.chat.id;
  if (message.text === "/start") {
    const welcomeMessage = `
    👋 Welcome to Movie Rating Bot! 🎥

    Here's what I can do for you:
    - Search for movies by title
    - Get details like release year, rating, genre
    - Stay updated with your favorite films

    Type a movie name to get started!
    `;
    bot.sendMessage(chatId, welcomeMessage);
  } else await moviesController.handleCommands(message);
});

bot.on("callback_query", async (callbackQuery) => {
  const { data: movieId, message } = callbackQuery;
  const chatId = message.chat.id;
  try {
    const movieDetail = await moviesApi.getMovieById(movieId);
    const movie = movieDetail.data;
    await moviesController.sendMovieDetails(movie, message);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    await bot.sendMessage(chatId, "Failed to fetch movie details!");
  }

  bot.answerCallbackQuery(callbackQuery.id);
});

// console.log("Bot is running...");
app.listen(3000, () => {
  console.log(`Movie rating app running on port: 3000`);
});
module.exports = app;
