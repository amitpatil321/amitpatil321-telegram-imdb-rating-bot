const express = require("express");
const { handler } = require("./controller/index");
const app = express();
const port = 3000;

app.use(express.json());

app.post("*", async (req, res) => {
  res.send(await handler(req));
});

app.get("*", async (req, res) => {
  res.send(await handler(req));
});

app.listen(port, () => {
  console.log(`Movie rating app running on port: ${port}`);
});
