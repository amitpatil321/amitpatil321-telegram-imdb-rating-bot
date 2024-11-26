const { handleMessage } = require("./lib/telegram");

// async function handler(req, method) {
//   const { body } = req;
//   if (body) {
//     const messageObj = body.message;
//     if (messageObj) await handleMessage(messageObj);
//     else console.log("messageObj is empty, Aborting!", req);
//   } else {
//     console.log("Message has no body, Aborting!");
//   }
//   return;
// }

async function handler(req, res) {
  if (req.method !== "POST") {
    console.log(`Invalid request method`);
  }

  const { body } = req;

  if (body && body.message) {
    try {
      await handleMessage(body.message);
    } catch (err) {
      console.error("Error handling message:", err.message); // Log error message
      return res.status(500).send({ error: "Internal Server Error" });
    }
  } else {
    console.log("Message body is missing or empty, Aborting!");
    return res.status(400).send({ error: "Bad Request" });
  }
}

module.exports = { handler };
