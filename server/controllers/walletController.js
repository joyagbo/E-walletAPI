const { sequelize } = require("../config/db_connection");
const { Wallet } = require("../models/wallet");


const createWallet = async (req, res) => {
    try {
      // Generate a UUID for the wallet
      const walletId = uuidv4();
  
      // Create the wallet
      const wallet = await Wallet.create({
        id: walletId,
        userId: req.user.id,
        balance: 0, // Initial balance is 0
      });
  
      return res.status(201).json({ walletId });
    } catch (error) {
      console.error('Error creating wallet:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };
  module.exports = {createWallet}
