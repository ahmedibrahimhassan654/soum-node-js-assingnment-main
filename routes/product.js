const express = require("express");
const {
  getAllProducts,
  getsingleProduct,
  addProduct,
} = require("../controllers/products");

const productRouter = express.Router();

productRouter.route("/").get(getAllProducts).post(addProduct);
productRouter.route("/:id").get(getsingleProduct);

// router.get("/productcategory/:id", getProductCategory);
// router.post("/productcategory", addCategory);

module.exports = productRouter;
