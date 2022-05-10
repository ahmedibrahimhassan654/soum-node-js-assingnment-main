const categoryController = require("../../controllers/categories");
const categoryModel = require("../../models/ProductCategory");
const httpMocks = require("node-mocks-http");
const categoryMock = require("../mock-data/newcategory.json");
const allCategory = require("../mock-data/allcategories.json");
categoryModel.create = jest.fn();
categoryModel.find = jest.fn();
let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Category Controller add category", () => {
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

describe("Category Controller get all categories", () => {
  it("should have get all categories function", () => {
    expect(typeof categoryController.getAllProductCategory).toBe("function");
  });
  it("should called categoryModel.find({})", async () => {
    await categoryController.getAllProductCategory(req, res, next);
    expect(categoryModel.find).toHaveBeenCalledWith({});
  });

  it("should return response 200 ", async () => {
    await categoryModel.find.mockReturnValue(allCategory);
    await categoryController.getAllProductCategory(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(allCategory);
  });
});
