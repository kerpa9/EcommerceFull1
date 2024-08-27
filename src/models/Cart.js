const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Cart = sequelize.define("cart", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Cart;
