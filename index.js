require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { dbConnection } = require("./config/db_connection");
const { useTreblle } = require("treblle");
const customerRoute = require("./routes/customerRoute");


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

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
