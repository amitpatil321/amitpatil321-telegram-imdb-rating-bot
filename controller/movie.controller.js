const moviesApi = require("../api/movies.api");
const bot = require("./bot.controller");
const languages = require("../config/languages");

module.exports = {
  async handleCommands(messageObj) {
    try {
      const chatId = messageObj.chat.id;
      const movieName = messageObj?.text || "";
      const movieInfo = await moviesApi.getMovie(movieName);
      if (movieInfo?.status === 200) {
        if (movieInfo?.data?.total_results == 0) {
          bot.sendMessage(chatId, "No movie found with this name!");
        } else if (movieInfo?.data?.total_results > 1) {
          const movieOptions = movieInfo.data.results
            .filter((movie) => movie.title && movie.release_date)
            .slice(0, 5)
            .map(({ title, release_date, original_language, id }) => {
              const language = languages?.find(
                (lang) => lang.iso_639_1 === original_language
              );
              const languageName = language
                ? language.english_name
                : original_language || "";

              return [
                {
                  text: `${title} (${
                    release_date ? release_date.split("-")[0] : "-"
                  }) - (${languageName})`,
                  callback_data: id.toString(),
                },
              ];
            });
          try {
            bot.sendMessage(
              messageObj.chat.id,
              "Which one did you have in mind?",
              {
                reply_markup: {
                  inline_keyboard: movieOptions,
                },
              }
            );
          } catch (err) {
            console.error("Error fetching movie:", error);
            bot.sendMessage(
              messageObj.chat.id,
              "Failed to fetch movie information."
            );
          }
        } else {
          let movie = movieInfo.data.results[0];
          this.sendMovieDetails(movie, messageObj);
        }
      } else {
        bot.sendMessage(chatId, "Request failed please try again!");
      }
    } catch (error) {
      const chatId = messageObj.chat.id;
      console.log(error);
      bot.sendMessage(chatId, "Unexpected error, Please try again!");
    }
  },
  async sendMovieDetails(movie, messageObj) {
    const chatId = messageObj.chat.id;
    let messageText =
      `*Title:* ${movie?.original_title || "N/A"}\n` +
      `*IMDb Rating:* ${
        movie?.vote_average ? movie.vote_average.toFixed(1) : "NA"
      }\n` +
      `*Release Date:* ${
        movie?.release_date ? movie.release_date.split("-")[0] : "Unknown"
      }\n` +
      `*Genres:* ${
        movie?.genres?.length
          ? movie.genres.map((each) => each?.name).join(", ")
          : "-"
      }\n` +
      `*Plot:* ${movie?.overview}`;
    bot.sendMessage(chatId, messageText, {
      parse_mode: "Markdown",
    });
    if (movie?.poster_path) {
      const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      bot.sendPhoto(chatId, posterUrl);
    }
  },
};
