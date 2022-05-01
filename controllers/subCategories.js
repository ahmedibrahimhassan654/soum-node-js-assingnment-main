const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const ProductSub = require("../models/ProductSub");

// @desc      Get all categories
// @route     GET /api/v1/categories

// @access    Public
exports.create = asyncHandler(async (req, res) => {
  const { name, description, parent } = req.body;
  const newsub = await new ProductSub({
    name,
    description,
    parent,
  }).save();
  res.status(200).json({ message: "success", data: newsub });
});

//@desc     get  all sub category
//@route    get/api/v1/sub
//@access   puplic
exports.list = asyncHandler(async (req, res, next) => {
  const allSubs = await ProductSub.find({}).populate("parent").exec();
  res.status(200).json({
    message: "success",
    data: allSubs,
  });
});
// @desc      Get single subcategory
// @route     GET /api/v1/sub/:id
// @access    Public
exports.getsubCategory = asyncHandler(async (req, res, next) => {
  const subcategory = await ProductSub.findById(req.params.id)
    .populate("parent")
    .exec();

  if (!subcategory) {
    return next(
      new ErrorResponse(`No subcategory with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: subcategory,
  });
});
