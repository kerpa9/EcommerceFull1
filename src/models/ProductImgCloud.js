const sequelize = require("../utils/connection");
const { DataTypes } = require("sequelize");

const ProductImgCloud = sequelize.define(
  "productImgCloud",
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

module.exports = ProductImgCloud;
