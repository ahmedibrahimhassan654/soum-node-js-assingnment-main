const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const ProductCategory = require("../models/ProductCategory");

// @desc      Get all categories
// @route     GET /api/v1/categories

// @access    Public
exports.getAllProductCategory = asyncHandler(async (req, res, next) => {
  try {
    const categories = await ProductCategory.find({});
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
});

// @desc      Get single category
// @route     GET /api/v1/category/:id
// @access    Public
exports.getProductCategory = asyncHandler(async (req, res, next) => {
  const category = await ProductCategory.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`No category with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json(category);
});

// @desc      Add category
// @route     POST /api/v1/category
// @access    Private
exports.addCategory = asyncHandler(async (req, res, next) => {
  try {
    const category = await ProductCategory.create(req.body);

    res.status(201).json(category);
  } catch (err) {
    next(err);
    // console.log(err._message);
  }
});
