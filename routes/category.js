const express = require("express");
const {
  getAllProductCategory,
  getProductCategory,
  addCategory,
} = require("../controllers/categories");

const catrouter = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *    Category:
 *     type: object
 *     required:
 *      - name
 *      - description
 *     properties:
 *        id:
 *          type: string
 *          description: id of the category
 *        name:
 *          type: string
 *          description: name of the category
 *        description:
 *          type: string
 *          description: description of the category
 *
 *     example:
 *        name: "category name"
 *        description: "category description"
 */

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category Api's
 */
catrouter
  /**
   * @swagger
   * /cat:
   *  get:
   *   summary: get all categories
   *   tags: [Category]
   *   description: get all categories this action happen when the requested user role is driver or admin

   *
   *
   *
   *   responses:
   *    200:
   *     description: success
   *    401:
   *      description: you are not authorized to access this route
   *    500:
   *     description : error
   */
  .route("/")
  .get(getAllProductCategory)
  /**
   * @swagger
   * /cat:
   *  post:
   *   summary: Create new category
   *   tags: [Category]
   *   description: create new category this end point only user with role user and admin can access it
   *   requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Category'
   *
   *   responses:
   *    201:
   *     description: New Category created
   *    401:
   *      description: you are not authorized to access this route
   *    500:
   *     description : error
   */
  .post(addCategory);
catrouter
  .route("/:id")
  /**
   * @swagger
   * /cat/{id}:
   *  get:
   *   summary: get single category
   *   tags: [Category]
   *   description: get single category this action happen when the >>>>>>>
   *   parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The cat id

   *
   *
   *
   *   responses:
   *    200:
   *     description: success
   *    401:
   *      description: you are not authorized to access this route
   *    500:
   *     description : error
   */

  .get(getProductCategory);

// router.get("/productcategory/:id", getProductCategory);
// router.post("/productcategory", addCategory);

module.exports = catrouter;
