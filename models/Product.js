const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "please add product name "],
      trim: true,
      maxlength: [50, "name can not be more than 50 characters"],
      text: true, //used when use search
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: [32, "price can not be more than 32 characters"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
    },
    subs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductSub",
      },
    ],

    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
