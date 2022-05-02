const categoryController = require("../../controllers/categories");
const categoryModel = require("../../models/ProductCategory");

categoryModel.create = jest.fn();

describe("Category Controller", () => {
  it("should have add category function", () => {
    expect(typeof categoryController.addCategory).toBe("function");
  });
  it("should create category scema model ", async () => {
    await categoryController.addCategory();
    expect(categoryModel.create).toBeCalled();
  });
});
