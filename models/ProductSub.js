const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const productSubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please add an category name"],
      minlength: [3, "too short"],
      maxlength: [100, "Too Long"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "please add  category description"],
      minlength: [3, "too short"],
      maxlength: [100, "Too Long"],
    },

    parent: {
      type: ObjectId,
      ref: "ProductCategory",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductSub", productSubSchema);
