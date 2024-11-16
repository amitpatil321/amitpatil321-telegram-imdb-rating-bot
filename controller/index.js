const { handleMessage } = require("./lib/telegram");

async function handler(req, method) {
  const { body } = req;
  if (body) {
    const messageObj = body.message;
    if (messageObj) await handleMessage(messageObj);
    else console.log("messageObj is empty, Aborting!");
  } else {
    console.log("Message has no body, Aborting!");
  }
  return;
}

module.exports = { handler };
