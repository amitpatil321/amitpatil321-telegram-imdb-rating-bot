const utils = require("../../utils/utils");
const movieController = require("../../controller/lib/moviesDB");

async function handleMessage(messageObj) {
  const messageText = messageObj?.text || "";
  console.log(messageText);
  // if its a bot command
  if (messageText.charAt(0) === "/") {
    console.log("Command detected");
    const command = messageText.substr(1);
    this.handleCommands(messageObj, command);
  } else {
    // else its a movie name
    console.log("Movies name received");
    console.log(messageObj);
    movieController.handleMovie(messageObj);
  }
}

async function handleCommands(messageObj, command) {
  switch (command) {
    case "start":
      return utils.sendMessage(
        messageObj,
        `Welcome *${messageObj?.from?.first_name}* 🍿, Ready to find out if your next pick is a blockbuster or a flop? Let's dive into the world of ratings! \n\n Enter movie name and press enter`,
        { parse_mode: "Markdown" }
      );
    case "latest":
      return utils.sendMessage(messageObj, `Latest movies`, {
        parse_mode: "Markdown",
      });
    default:
      return utils.sendMessage(messageObj, `Unknown command`);
  }
}

module.exports = { handleMessage };
