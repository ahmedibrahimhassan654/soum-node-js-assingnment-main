const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Product = require("../models/Product");

// @desc      Get getAllProducts
// @route     GET /api/v1/products
// @access    Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find()
    .limit(parseInt(req.params.count))

    .populate("category")
    .populate("subs")
    .populate("cratedBy")
    .sort([["createdAt", "desc"]])
    .exec();

  res.status(200).json({ success: true, data: products });
});

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    puplic
exports.create = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});
exports.getsingleProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate("category")
    .populate("subs")
    .exec();

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: product });
});
