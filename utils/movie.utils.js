const moviesApi = require("../api/movies.api");

module.exports = {
  async handleCommands(messageObj) {
    const chatId = msg.chat.id;
    const movieName = messageObj?.text || "";
    const movieInfo = await moviesApi.getMovie(movieName);
    console.log("0");
    if (movieInfo?.status === 200 && movieInfo?.data?.total_results) {
      if (movieInfo?.data?.total_results > 1) {
        console.log(movieInfo.data.results[0]);
      } else {
        let movie = movieInfo.data.results[0];
        let messageText =
          `*Title:* ${movie?.original_title}\n` +
          `*IMDb Rating:* ${movie?.vote_average.toFixed(1) || "NA"}\n` +
          `*Release Date:* ${movie.release_date.split("-")[0]}\n` +
          `*Genres:* ${movie?.genres?.map((each) => each?.name).join(", ")}`;
        bot.sendMessage(chatId, messageText);
      }
    }
  },
};
