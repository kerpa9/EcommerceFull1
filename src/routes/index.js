const express = require("express");
const routerUser = require("./user.router");
const routerCategory = require("./category.router");
const routerProduct = require("./product.router");
const { verifyJwt } = require("../utils/verifyJWT");
const routerCart = require("./cart.router");
const routerPurchase = require("./purchase.router");
const routerProdImg = require("./productImg.route");
const router = express.Router();

router.use("/users", routerUser);
router.use("/categories", routerCategory);
router.use("/products", routerProduct);
//🔐
router.use("/cart", verifyJwt, routerCart);
router.use("/purchase", verifyJwt, routerPurchase);
router.use("/products_images", verifyJwt, routerProdImg);

module.exports = router;
