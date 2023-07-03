const express = require("express");
const { useTreblle } = require("treblle");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const port = 4000;

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

//Setting up Treblle
useTreblle(app, {
  apiKey: process.env.TREBLLE_API_KEY,
  projectId: process.env.TREBLLE_API_KEY,
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
