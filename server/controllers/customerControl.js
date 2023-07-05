// const { sequelize } = require("../config/db_connection");
const { errorResponse } = require("../errors/errorResponse");
const { Customer } = require("../models/customer");
const bcrypt = require('bcryptjs');
const { successResponse } = require("../succes_handler/success");
//const saltrounds = bcrypt.genSalt(12)

//Customer registration

const registerCustomer = async (req, res) =>{
    try{
        const {name, email, username, password} = req.body
        //ensuring customer enters all required field
        if (!name || !email || !username || !password)
        return errorResponse(res, 'Enter all the required field', 400)

        const existingCust = await Customer.findOne({where:{username: username}})
        //checking for user dublicate
        if (existingCust)
        return errorResponse(res, 'Account already existing', 409)

        const hashPwd = await bcrypt.hash(password, 12)
   
        const newCustomer = {
            "name": name,
            "email": email,
            "username": username,
            "password": hashPwd
        }
        const result = await Customer.create(newCustomer)
        console.log(result)
        return successResponse(res, "Your account has been created succesfully",{result}, 201 )


    } catch(error){
        console.log(error.message)
        return errorResponse(res, error.message,false, 500);
    }
}



module.exports = { registerCustomer}
