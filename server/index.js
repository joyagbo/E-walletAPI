const express = require("express");
const { useTreblle } = require("treblle");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
// const port = 4000;
const treblle = require('@treblle/express');
const { custRoute } = require("./routes/customerRoute");
const { dbConnection } = require("./config/db_connection");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use('/', custRoute)

app.use(treblle());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

//Setting up Treblle
useTreblle(app, {
  apiKey: process.env.TREBLLE_API_KEY,
  projectId: process.env.TREBLLE_API_KEY,
});

const startServer = async () => {
    try {
        // connect to the database
        dbConnection(process.env.ATLAS_URL);

        app.listen(process.env.PORT, () =>{
            console.log(`server is running on port ${process.env.PORT}`)
        })
        ;
    } catch (error) {
        console.log(error);
    }
};

startServer();
// app.listen(process.env.PORT, () => {
//   console.log(`Example app listening on port ${process.env.PORT}`);
// });
