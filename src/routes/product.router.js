const {
  getAll,
  create,
  getOne,
  remove,
  update,
  setProducts,
} = require("../controllers/product.controllers");
const express = require("express");
const { verifyJwt } = require("../utils/verifyJWT");

const routerProduct = express.Router();

routerProduct.route("/").get(getAll).post(verifyJwt, create); //🔐

routerProduct
  .route("/:id")
  .get(getOne)
  .delete(verifyJwt, remove) //🔐
  .put(verifyJwt, update); //🔐

//products/:id/productImg
routerProduct.route("/:id/images").post(verifyJwt, setProducts);

module.exports = routerProduct;
