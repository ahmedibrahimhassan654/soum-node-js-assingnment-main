const Category = require("../../models/ProductCategory");
const SubCategory = require("../../models/ProductSub");

const category = async (categoryId) => {
  try {
    const category = await Category.findById(categoryId);
    return { ...category._doc, _id: category.id };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
module.exports = {
  categories: async () => {
    try {
      const category = await Category.find();
      return category.map((category) => {
        return { ...category._doc };
      });
    } catch (err) {
      throw err;
    }
  },
  subs: async () => {
    try {
      const sub = await SubCategory.find();
      return sub.map((sub) => {
        return { ...sub._doc, _id: sub.id, parent: category(sub.parent) };
      });
    } catch (err) {
      throw err;
    }
  },
  createCategory: async (args, req) => {
    const category = new Category({
      name: args.categoryInput.name,
      description: args.categoryInput.description,
    });
    try {
      const result = await category.save();
      return { ...result._doc };
    } catch (err) {
      throw err;
    }
  },
  createSub: async (args, req) => {
    const sub = new SubCategory({
      name: args.subInput.name,
      description: args.subInput.description,
      parent: args.subInput.parent,
    });
    try {
      const result = await sub.save();
      return {
        ...result._doc,
        _id: result.id,
        parent: category.bind(this, result.parent),
      };
    } catch (err) {
      throw err;
    }
  },
};
