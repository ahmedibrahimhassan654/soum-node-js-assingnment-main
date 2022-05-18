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

    image: {
      type: String,
      default: "no-image.jpg",
    },
    productstate: {
      type: String,
      enum: ["available", "draft"],
      default: "available",
    },
    payment: {
      type: String,
      enum: ["reserved", "sold", "returned"],
    },
    paymentSucess: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
