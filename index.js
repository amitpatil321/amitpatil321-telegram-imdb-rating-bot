const moviesController = require("./controller/movie.controller");
const bot = require("./controller/bot.controller");
const moviesApi = require("./api/movies.api");
const packageInfo = require("./package.json");
const CONSTANTS = require("./config/constants");
const { getWelcomeText, getTrailer } = require("./utils/movie.utils");

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
    bot.sendMessage(chatId, getWelcomeText());
  } else await moviesController.handleCommands(message);
});

bot.on("callback_query", async (callbackQuery) => {
  const { data, message } = callbackQuery;
  const { action, movieId } = JSON.parse(data);
  const chatId = message.chat.id;
  try {
    const movieDetail = await moviesApi.getMovieById(movieId);
    const movie = movieDetail.data;
    switch (action) {
      case "movie_details":
        try {
          await moviesController.sendMovieDetails(movie, message);
        } catch (error) {
          console.error("Error fetching movie details:", error);
          await bot.sendMessage(chatId, "Failed to fetch movie details!");
        }
        break;
      case "more_images":
        const posters = movie.images?.posters?.slice(0, 5) || [];
        if (posters.length > 0) {
          for (const poster of posters) {
            await bot.sendPhoto(
              chatId,
              `${CONSTANTS?.MOVIE_IMAGE_BASE}${poster.file_path}`
            );
          }
        } else await bot.sendMessage(chatId, "No posters available!");
        break;

      case "more_trailers":
        const trailers = movie.videos?.results?.slice(0, 3) || [];
        if (trailers.length > 0) {
          for (const trailer of trailers) {
            await bot.sendMessage(chatId, `🎥 Video: \n` + getTrailer(trailer));
            await delay(2000);
          }
        } else await bot.sendMessage(chatId, "No trailers available!");
        break;
      default:
        await bot.sendMessage(chatId, "Unknown action.");
        break;
    }
  } catch (error) {
    console.log(error);
    await bot.sendMessage(chatId, "Failed to fetch details!");
  }

  bot.answerCallbackQuery(callbackQuery.id);
});

console.log("Bot is running...");
module.exports = app;
