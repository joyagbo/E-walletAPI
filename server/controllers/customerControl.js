const { sequelize } = require("../config/db_connection");
const { errorResponse } = require("../errors/errorResponse");
const { Customer } = require("../models/customer");

//Customer registration

const registerCustomer = async () =>{
    try{
        const {name, email, username, password} = req.body
        //ensuring customer enters all required field
        if (!name || !email || !username || !password)
        return errorResponse(res, 'Enter all the required field')
        

    } catch(error){

    }
}