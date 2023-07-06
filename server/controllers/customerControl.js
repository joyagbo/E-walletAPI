// const { sequelize } = require("../config/db_connection");
const { Customer } = require("../models/customer");
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { errorResponse } = require("../errors/errorResponse");
const { successResponse } = require("../succes_handler/success");
//const saltrounds = bcrypt.genSalt(12)

//Customer registration

const registerCustomer = async (req, res) =>{
    try{
        const {name, email, username, password} = req.body
        //ensuring customer enters all required field
        if (!name || !email || !username || !password)
        return errorResponse(res, 'Enter all the required field', 400)

        const existingCust = await Customer.findOne({$or: [{ username }, { email }]})
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


//Customsr login

const custLogin = async (req, res) => {
    
    try {
        const {username, password} = req.body;

        if (!username || !password)
            return errorResponse(res,'Username or password required' , 400)
            // throw new Error('Username or password required')   
        
    const findUser = await Customer.findOne({username: username});

    if (!findUser) {
        //throw new Error('User not found')
        return errorResponse(res, 'User not found', 404)
    } else {
        const verifyPassword = await bcrypt.compare(password, findUser.password )

        if (!verifyPassword){
           return errorResponse(res,'Invalid password', 401)
        } else {
            const token = jsonwebtoken.sign({username: findUser.username, id: findUser._id}, process.env.SECRET_JWT, { expiresIn: '30mins' })
            //console.log(process.env.SECRET_JWT)
            return successResponse(res, "logged in successfully",{token}, 200,)

        }
    }
    } catch (error){
      return  errorResponse(res, error.message,false, 500)
        
    }
    
}


module.exports = { registerCustomer, custLogin}
