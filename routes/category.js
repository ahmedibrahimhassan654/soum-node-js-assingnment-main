const express = require("express");
const {
  getAllProductCategory,
  getProductCategory,
  addCategory,
} = require("../controllers/categories");

const catrouter = express.Router();

catrouter.route("/").get(getAllProductCategory).post(addCategory);
catrouter.route("/:id").get(getProductCategory);

// router.get("/productcategory/:id", getProductCategory);
// router.post("/productcategory", addCategory);

module.exports = catrouter;
