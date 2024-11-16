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
    console.log(`Invalid request method: ${req.method}`);
    res.status(405).send("Method Not Allowed");
    return;
  }

  const { body } = req;
  if (body && body.message) {
    try {
      await handleMessage(body.message);
      res.status(200).send("Message processed");
    } catch (err) {
      console.error("Error handling message:", err);
      res.status(500).send("Internal Server Error");
    }
  } else {
    console.log("Message body is missing or empty, Aborting!");
    res.status(400).send("Bad Request");
  }
}

module.exports = { handler };
