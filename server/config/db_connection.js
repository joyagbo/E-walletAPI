//const Sequelize = require('sequelize');
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
// const sequelize = new Sequelize(process.env.DATABASE_NAME,process.env.DATABASE_USER, process.env.DATABASE_PASSWORD,
// {dialect:'mysql', host:'localhost'})
// console.log(process.env.DATABASE_NAME)


//module.exports = {sequelize}
