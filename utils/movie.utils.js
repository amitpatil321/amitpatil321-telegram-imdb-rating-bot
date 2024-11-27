const moviesApi = require("../api/movies.api");
const bot = require("./bot.utils");

module.exports = {
  async handleCommands(messageObj) {
    const chatId = messageObj.chat.id;
    const movieName = messageObj?.text || "";
    const movieInfo = await moviesApi.getMovie(movieName);
    if (movieInfo?.status === 200) {
      if (movieInfo?.data?.total_results == 0) {
        console.log("Aaa");
        bot.sendMessage(chatId, "No movie found with this name!");
      } else if (movieInfo?.data?.total_results > 1) {
        const movieOptions = movieInfo.data.results
          .filter((movie) => movie.title && movie.release_date)
          .slice(0, 5)
          .map((movie) => [
            {
              text: `${movie.title} (${
                movie.release_date ? movie.release_date.split("-")[0] : "-"
              })`,
              callback_data: movie.id.toString(),
            },
          ]);
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
      }`;
    bot.sendMessage(chatId, messageText, {
      parse_mode: "Markdown",
    });
    if (movie?.poster_path) {
      const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      bot.sendPhoto(chatId, posterUrl);
    }
  },
};
