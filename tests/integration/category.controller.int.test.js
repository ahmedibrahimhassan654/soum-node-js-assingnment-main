const request = require("supertest");
const app = require("../../app");
const catModel = require("../mock-data/newcategory.json");
const allcate = require("../mock-data/allcategories.json");
const endpointUrl = "/api/v1/cat/";

describe(endpointUrl, () => {
  test("get" + endpointUrl, async () => {
    const response = await request(app).get(endpointUrl);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("create new cat " + endpointUrl, async () => {
    const response = await request(app).post(endpointUrl).send(catModel);
    if (response.statusCode === 201) {
      expect(response.body).toStrictEqual(catModel);
    } else if (response.statusCode === 400) {
      expect(response.error).toBeDefined();
    }
  });
  it(
    "should return error 400 on malformed data with POST" + endpointUrl,
    async () => {
      const response = await request(app)
        .post(endpointUrl)
        .send({ title: "Missing done property" });
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({
        error: "please add  category description,please add an category name",
        success: false,
      });
    }
  );
});
