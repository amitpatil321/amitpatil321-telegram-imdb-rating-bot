const moviesApi = require("../api/movies.api");
const bot = require("./bot.controller");

const {
  getMovieList,
  getMoreOptions,
  getPosterPath,
  moreMovieOptions,
  morePosterOptions,
  getMovieDetailsText,
} = require("../utils/movie.utils");

module.exports = {
  async handleCommands(messageObj) {
    try {
      const {
        text: movieName,
        chat: { id: chatId },
      } = messageObj;
      if (!movieName || !chatId) return false;

      const movieInfo = await moviesApi.getMovie(movieName);
      const {
        status,
        data: { total_results, results },
      } = movieInfo;

      if (status === 200) {
        if (total_results == 0) {
          bot.sendMessage(chatId, "No movie found with given name!");
        } else if (total_results > 1) {
          let movieOptions = getMovieList(results);
          try {
            bot.sendMessage(
              chatId,
              "Which one did you have in mind?",
              getMoreOptions(movieOptions)
            );
          } catch (error) {
            console.error("Error fetching movie:", error);
            bot.sendMessage(chatId, "Failed to fetch movie information.");
          }
        } else {
          let movie = results[0];
          this.sendMovieDetails(movie, messageObj);
        }
      } else bot.sendMessage(chatId, "Request failed please try again!");
    } catch (error) {
      const chatId = messageObj.chat.id;
      console.log(error);
      bot.sendMessage(chatId, "Unexpected error, Please try again!");
    }
  },
  async sendMovieDetails(movie, messageObj) {
    const chatId = messageObj.chat.id;
    if (movie?.poster_path) {
      bot.sendPhoto(
        chatId,
        getPosterPath(movie),
        getMoreOptions(morePosterOptions(movie))
      );
    }

    bot.sendMessage(
      chatId,
      getMovieDetailsText(movie),
      getMoreOptions(moreMovieOptions(movie))
    );
  },
};
