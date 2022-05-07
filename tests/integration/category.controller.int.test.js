const request = require("supertest");
const app = require("../../app");
const catModel = require("../mock-data/newcategory.json");

const endpointUrl = "/api/v1/cat/";

describe(endpointUrl, () => {
  it("create new cat " + endpointUrl, async () => {
    const response = await request(app).post(endpointUrl).send(catModel);
    // expect(response.statusCode).toBe(200);

    console.log(response.body);
  });
});
