const categoryController = require("../../controllers/categories");
const categoryModel = require("../../models/ProductCategory");
const httpMocks = require("node-mocks-http");
const categoryMock = require("../mock-data/newcategory.json");
categoryModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("Category Controller", () => {
  it("should have add category function", () => {
    expect(typeof categoryController.addCategory).toBe("function");
  });
  it("should create category scema model ", async () => {
    req.body = categoryMock;
    await categoryController.addCategory(req, res, next);
    expect(categoryModel.create).toBeCalledWith(categoryMock);
  });
});
