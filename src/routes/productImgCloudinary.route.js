const {
  create,
  remove,
} = require("../controllers/productImgCloudinary.controller");

const express = require("express");
const upload = require("../utils/multer");

const routerProductImgCloud = express.Router();

routerProductImgCloud.route("/").post(upload.single("image"), create);

routerProductImgCloud.route("/:id").delete(remove);

module.exports = routerProductImgCloud;
