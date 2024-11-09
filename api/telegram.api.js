const axios = require("axios");
const CONSTANTS = require("../config/constants");

const BASE_URL = `${CONSTANTS.TELEGRAM_API_BASE}${process.env.TELEGRAM_TOKEN}`;

function api() {
  return {
    get(method, params) {
      return axios.get(`/${method}`, {
        baseURL: BASE_URL,
        params,
      });
    },
    post(method, params) {
      return axios(`/${method}`, {
        method: "post",
        baseURL: BASE_URL,
        params,
      });
    },
  };
}

module.exports = api();
