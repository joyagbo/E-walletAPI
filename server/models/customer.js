// const Sequelize = require('sequelize');
// const { sequelize } = require('../config/db_connection');

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "this field is required"],
        lowercase: true,
        unique: true
    },
    username: {
        type: String,
        required: [true, "this field is required"],
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "this field is required"],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "this field is required"],
    },

}); 
const Customer = mongoose.model('Customer', UserSchema )

module.exports = {Customer}

// const Customer = sequelize.define('customer', {
//     customerid:{
//         type:Sequelize.UUID,
//         defaultValue:Sequelize.UUIDV4,
//         allowNull: false,
//         primaryKey: true
//     },
//     name:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     email:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
    
//     username:{
//         type:Sequelize.STRING,
//         allowNull:false,
//         unique:true
//     },
//     password:{
//         type:Sequelize.TEXT,
//         allowNull:false

//     } 
// })

// module.exports = {Customer}