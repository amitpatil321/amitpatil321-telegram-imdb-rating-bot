const axios = require("axios");
const CONSTANTS = require("../config/constants");

const axiosInstance = axios.create({
  timeout: 10000,
});

function moviesApi() {
  return {
    async getMovie(params) {
      try {
        return axiosInstance.get(
          `${CONSTANTS.MOVIE_API_BASE}search/movie?query=${params}&api_key=${process.env.TMDB_API_KEY}`
        );
      } catch (error) {
        return Promise.reject(error);
      }
    },
    getMovieById(id) {
      try {
        return axiosInstance.get(
          `${CONSTANTS.MOVIE_API_BASE}movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=images,videos`
        );
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };
}

module.exports = moviesApi();
