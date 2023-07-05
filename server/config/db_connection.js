const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_NAME,process.env.DATABASE_USER, process.env.DATABASE_PASSWORD,
{dialect:'mysql', host:'localhost'})
//console.log(process.env.DATABASE_NAME)


module.exports = {sequelize}
