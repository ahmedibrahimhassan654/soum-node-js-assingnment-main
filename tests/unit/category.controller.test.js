const categoryController = require("../../controllers/categories");
const categoryModel = require("../../models/ProductCategory");
const httpMocks = require("node-mocks-http");
categoryModel.create = jest.fn();

describe("Category Controller", () => {
  it("should have add category function", () => {
    expect(typeof categoryController.addCategory).toBe("function");
  });
  it("should create category scema model ", async () => {
    let req, res, next;

    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
    await categoryController.addCategory();
    expect(categoryModel.create).toBeCalled();
  });
});
