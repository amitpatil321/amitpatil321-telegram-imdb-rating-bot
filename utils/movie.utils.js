const moviesApi = require("../api/movies.api");

module.exports = {
  async handleCommands(messageObj) {
    const movieInfo = await moviesApi.getMovie(movieName);
    console.log("0");
    if (movieInfo?.status === 200 && movieInfo?.data?.total_results) {
      if (movieInfo?.data?.total_results > 1) {
        console.log(movieInfo.data.results[0]);
      } else {
        console.log(movieInfo.data.results[0]);
      }
    }
  },
};
