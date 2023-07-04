const Sequelize = require('sequelize');
const { sequelize } = require('../config/db_connection');

const Customer = sequelize.define('customer', {
    customerid:{
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    cusName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    
    username:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.TEXT,
        allowNull:false

    } 
})