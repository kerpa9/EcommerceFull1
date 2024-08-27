const ProductImg = require("../models/ProductImg");
const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const Purchase = require("./Purchase");
const User = require("./User");

// categoryId
Product.belongsTo(Category);
Category.hasMany(Product);

//userId
Cart.belongsTo(User);
User.hasMany(Cart);

//productId
Cart.belongsTo(Product);
Product.hasMany(Cart);

//userId
Purchase.belongsTo(User);
User.hasMany(Purchase);

//productId
Purchase.belongsTo(Product);
Product.hasMany(Purchase);

//productId
// ProductImg.belongsToMany(Product, { through: "prodImg" });
// Product.belongsToMany(ProductImg, { through: "prodImg" });
ProductImg.belongsTo(Product);
Product.hasMany(ProductImg);
