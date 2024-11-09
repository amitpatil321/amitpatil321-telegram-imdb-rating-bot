const axios = require("axios");
const CONSTANTS = require("../config/constants");

function moviesApi() {
  return {
    getMovie(params) {
      try {
        return axios.get(
          `${CONSTANTS.MOVIE_API_BASE}search/movie?query=${params}&api_key=${process.env.TMDB_API_KEY}`
        );
      } catch (error) {
        return Promise.reject(error);
      }
    },
    getMovieById(id) {
      try {
        return axios.get(
          `${CONSTANTS.MOVIE_API_BASE}movie/${id}?api_key=${process.env.TMDB_API_KEY}`
        );
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };
}

// Immediately invoke getAxiosInstance to export the instance with get and post methods
module.exports = moviesApi();
