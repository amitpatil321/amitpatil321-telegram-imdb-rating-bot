const utils = require("../../utils/utils");
const moviesApi = require("../../api/movies.api");

async function handleMovie(movieName) {
  if (movieName) {
    const movieInfo = await moviesApi.getMovie(movieName);
    console.log("movieInfo", movieInfo?.status, movieInfo?.data?.total_results);
    // if (movieInfo?.status === 200 && movieInfo?.data?.total_results) {
    //   if (movieInfo?.data?.total_results > 1) {
    //     const movieOptions = movieInfo.data.results
    //       .filter((movie) => movie.title && movie.release_date)
    //       .slice(0, 5)
    //       .map((movie) => [
    //         {
    //           text: `${movie.title} (${movie.release_date.split("-")[0]})`,
    //           callback_data: movie.id.toString(),
    //         },
    //       ]);
    //     if (movieOptions.length > 0) {
    //       bot.sendMessage(
    //         messageObj.chat.id,
    //         "Which one did you have in mind?",
    //         {
    //           reply_markup: {
    //             inline_keyboard: [...movieOptions],
    //           },
    //         }
    //       );
    //     }
    //   }
    // }
  }
}

module.exports = { handleMovie };
