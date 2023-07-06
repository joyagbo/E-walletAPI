const Sequelize = require("sequelize");
const sequelize = require("../config/db_connection");

const Wallet = sequelize.define("wallet", {
  walletid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  walletbal: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
  },
});
module.exports = {Wallet};
