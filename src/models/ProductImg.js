const sequelize = require("../utils/connection");
const { DataTypes } = require("sequelize");

const ProductImg = sequelize.define(
  "productImg",
  {
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // productId
  },
  {
    timestamps: false,
  }
);

module.exports = ProductImg;
