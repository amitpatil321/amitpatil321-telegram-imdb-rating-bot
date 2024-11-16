const { handleMessage } = require("./lib/telegram");

async function handler(req, method) {
  const { body } = req;
  if (body) {
    const messageObj = body.message;
    await handleMessage(messageObj);
  } else {
    console.log("Message has no body, Aborting!");
  }
  return;
}

module.exports = { handler };
