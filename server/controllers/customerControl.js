const { sequelize } = require("../config/db_connection");
const { errorResponse } = require("../errors/errorResponse");
const { Customer } = require("../models/customer");

//Customer registration

const registerCustomer = async () =>{
    try{
        const {name, email, username, password} = req.body
        //ensuring customer enters all required field
        if (!name || !email || !username || !password)
        return errorResponse(res, 'Enter all the required field', 400)

        const existingCust = await Customer.findAll({
            where: {username: username}
        })
        //checking for user dublicate
        if (existingCust)
        return errorResponse(res, 'Enter all the required field', 409)


    } catch(error){

    }
}