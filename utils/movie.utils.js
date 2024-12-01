const languages = require("../config/languages");
const CONSTANTS = require("../config/constants");

function getWelcomeText() {
  return `
    👋 Welcome to Movie Rating Bot! 🎥

    Here's what I can do for you:
    - Search for movies by title
    - Get details like release year, rating, genre
    - Stay updated with your favorite films

    Type a movie name to get started!

    Example: type "kesari" and hit enter
    `;
}

function getMovieDetailsText(movie) {
  const { original_title, vote_average, release_date, genres, overview } =
    movie;

  const voteAverage = vote_average ? vote_average.toFixed(1) : "NA";
  const releaseDate = release_date ? release_date.split("-")[0] : "Unknown";
  const movieGenres = genres?.length
    ? genres.map((each) => each?.name).join(", ")
    : "-";

  return `
*Title:* ${original_title || "N/A"}
*IMDb Rating:* ${voteAverage}
*Release Date:* ${releaseDate}
*Genres:* ${movieGenres}
*Plot:* ${overview}`;
}

function getPosterPath(movie) {
  return `${CONSTANTS?.MOVIE_IMAGE_BASE}${movie?.poster_path}`;
}

function getTrailer(trailer) {
  return `https://www.youtube.com/watch?v=${trailer.key}`;
}

function getMoreOptions(options) {
  return {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: options,
    },
  };
}

function getMovieList(movies) {
  if (movies?.length)
    return movies
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

            callback_data: JSON.stringify({
              action: "movie_details",
              movieId: id.toString(),
            }),
          },
        ];
      });
  else return [];
}

function moreMovieOptions(movie) {
  const formattedTitle = movie?.title
    ?.replace(/[^\w\s]/g, "")
    .trim.replace(/\s+/g, "-")
    .toLowerCase();
  return [
    [
      {
        text: "View more details",
        url: `https://www.themoviedb.org/movie/${movie?.id}/`,
      },
      {
        text: "Where to watch",
        url: `https://www.justwatch.com/us/movie/${formattedTitle}`,
      },
    ],
  ];
}

function morePosterOptions(movie) {
  let data = [
    [
      {
        text: "View more images",
        callback_data: JSON.stringify({
          action: "more_images",
          movieId: movie?.id,
        }),
      },
      {
        text: "View videos",
        callback_data: JSON.stringify({
          action: "more_trailers",
          movieId: movie?.id,
        }),
      },
    ],
  ];
  return data;
}

module.exports = {
  getWelcomeText,
  getMovieDetailsText,
  getPosterPath,
  getTrailer,
  getMoreOptions,
  getMovieList,
  moreMovieOptions,
  morePosterOptions,
};
