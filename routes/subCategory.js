const express = require("express");
const {
  create,
  list,
  getsubCategory,
} = require("../controllers/subCategories");

const subCatrouter = express.Router();

subCatrouter.route("/").get(list).post(create);
subCatrouter.route("/:id").get(getsubCategory);

// router.get("/productcategory/:id", getProductCategory);
// router.post("/productcategory", addCategory);

module.exports = subCatrouter;
