const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.ATLAS_URI

const dbConnection = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'E-WALLETAPI'
    })
    .then(() => {
        console.log("Db connected")
    }).catch(err =>{
        console.log(err)
    })
}

module.exports = { dbConnection}
