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
      unique: true,
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
      autopopulate: { select: "_id name", maxDepth: 1 },
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("ProductSub", productSubSchema);
