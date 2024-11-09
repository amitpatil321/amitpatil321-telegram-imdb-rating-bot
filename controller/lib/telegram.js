const utils = require("../../utils/utils");
const movieController = require("../../controller/lib/moviesDB");

async function handleMessage(messageObj) {
  const messageText = messageObj?.text || "";
  if (messageText.charAt(0) === "/") {
    const command = messageText.substr(1);
    utils.handleCommands(messageObj, command);
  } else {
    movieController.handleMovie(messageText);
  }
}

module.exports = { handleMessage };
