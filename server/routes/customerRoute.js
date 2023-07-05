const express = require('express');
const { registerCustomer } = require('../controllers/customerControl');

const custRoute = express.Router();

custRoute.post('/signup', registerCustomer)

module.exports = {custRoute}