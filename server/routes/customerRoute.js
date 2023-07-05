const express = require('express');
const { registerCustomer, custLogin } = require('../controllers/customerControl');

const custRoute = express.Router();

custRoute.post('/signup', registerCustomer)
custRoute.post('/login', custLogin)

module.exports = {custRoute}