const express = require("express");
const { useTreblle } = require("treblle");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const { dbConnection } = require("./config/db_connection");
const customerRoute = require("./routes/customerRoute");
app.use(bodyParser.urlencoded({ extended: false }));

//middleware
app.use(express.json());
app.use(cookieParser());

// setting all routes
app.use("/api", customerRoute);

//Setting up Treblle
useTreblle(app, {
  apiKey: process.env.TREBLLE_API_KEY,
  projectId: process.env.PRODUCT_API_KEY,
});

const startServer = async () => {
  try {
    // connect to the database
    dbConnection(process.env.ATLAS_URL);

    app.listen(process.env.PORT, () => {
      console.log(`server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
