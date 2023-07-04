const express = require("express");
const { useTreblle } = require("treblle");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const treblle = require('@treblle/express')

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use(treblle());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

//Setting up Treblle
useTreblle(app, {
  apiKey: process.env.TREBLLE_API_KEY,
  projectId: process.env.TREBLLE_API_KEY,
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
