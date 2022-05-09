const categoryController = require("../../controllers/categories");
const categoryModel = require("../../models/ProductCategory");
const httpMocks = require("node-mocks-http");
const categoryMock = require("../mock-data/newcategory.json");
categoryModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Category Controller", () => {
  beforeEach(() => {
    req.body = categoryMock;
  });

  it("should have add category function", () => {
    expect(typeof categoryController.addCategory).toBe("function");
  });
  it("should create category scema model ", async () => {
    await categoryController.addCategory(req, res, next);
    expect(categoryModel.create).toBeCalledWith(categoryMock);
  });

  it("should return response 201 ", async () => {
    await categoryController.addCategory(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return json body in response ", async () => {
    await categoryModel.create.mockReturnValue(categoryMock);
    await categoryController.addCategory(req, res, next);
    expect(res._getJSONData()).toStrictEqual(categoryMock);
  });
  it("should handle errors", async () => {
    const errorMessage = { message: "duplicate key error collection" };
    const rejectedPromise = Promise.reject(errorMessage);
    categoryModel.create.mockReturnValue(rejectedPromise);
    await categoryController.addCategory(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
