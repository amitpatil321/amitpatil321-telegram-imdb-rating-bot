const utils = require("../../utils/utils");
const moviesApi = require("../../api/movies.api");

const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

async function handleMovie(messageObj) {
  const movieName = messageObj?.text || "";
  console.log("movieName", movieName, messageObj);
  if (movieName) {
    try {
      const movieInfo = await moviesApi.getMovie(movieName);
      console.log("0");
      if (movieInfo?.status === 200 && movieInfo?.data?.total_results) {
        console.log("1");
        if (movieInfo?.data?.total_results > 1) {
          console.log("2");
          const movieOptions = movieInfo.data.results
            .filter((movie) => movie.title && movie.release_date)
            .slice(0, 5)
            .map((movie) => [
              {
                text: `${movie.title} (${movie.release_date.split("-")[0]})`,
                callback_data: movie.id.toString(),
              },
            ]);

          if (movieOptions.length > 0) {
            console.log("3");
            bot.sendMessage(
              messageObj.chat.id,
              "Which one did you have in mind?",
              {
                reply_markup: {
                  inline_keyboard: movieOptions, // Spread not needed if movieOptions is already an array of arrays
                },
              }
            );
          }
        } else {
          console.log("4");
          // Single movie found
          await utils.sendDetails(messageObj, movieInfo.data.results[0]);
        }
      } else {
        console.log("5");
        bot.sendMessage(messageObj.chat.id, "No movies found.");
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
      bot.sendMessage(messageObj.chat.id, "Failed to fetch movie information.");
    }
  } else {
    console.log("Missing movie name");
    bot.sendMessage(messageObj.chat.id, "Please enter a movie name.");
  }
}

// Handle callback queries for inline keyboard selections
bot.on("callback_query", async (callbackQuery) => {
  const { data: movieId, message } = callbackQuery;
  try {
    const movieDetail = await moviesApi.getMovieById(movieId);
    const movie = movieDetail.data;
    await utils.sendDetails(message, movie);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    await utils.sendMessage(message, "Failed to fetch movie details.");
  }

  bot.answerCallbackQuery(callbackQuery.id);
});

// Handle text messages and pass them to handleMovie
bot.on("message", (messageObj) => {
  if (messageObj && messageObj.text) {
    handleMovie(messageObj);
  } else {
    console.log("Received a message without text, ignoring.");
  }
});

module.exports = { handleMovie };
