const express = require("express");

const router = express.Router();

const {
  create,
  getAllProducts,
  getsingleProduct,


} = require("../controllers/products");

router.post("/",  create);

router.get("/", getAllProducts); //product/100
;
router.get("/product/:_id", getsingleProduct);




// module.exports = router;
