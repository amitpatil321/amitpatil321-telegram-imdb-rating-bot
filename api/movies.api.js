const axios = require("axios");
const CONSTANTS = require("../config/constants");

const axiosInstance = axios.create({
  timeout: 10000, // 10 seconds
});

function moviesApi() {
  return {
    async getMovie(params) {
      console.log("moviesApi.getMovie", params);
      try {
        console.log("inside try");
        console.log(
          `${CONSTANTS.MOVIE_API_BASE}search/movie?query=${params}&api_key=${process.env.TMDB_API_KEY}`
        );
        // return axiosInstance.get(
        //   `${CONSTANTS.MOVIE_API_BASE}search/movie?query=${params}&api_key=${process.env.TMDB_API_KEY}`
        // );
        const url = `${CONSTANTS.MOVIE_API_BASE}search/movie?query=${params}&api_key=${process.env.TMDB_API_KEY}`;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }

          const json = await response.json();
          console.log(json);
          return json;
        } catch (error) {
          console.error(error.message);
        }
      } catch (error) {
        console.log("inside catch");
        return Promise.reject(error);
      }
    },
    getMovieById(id) {
      try {
        return axiosInstance.get(
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
