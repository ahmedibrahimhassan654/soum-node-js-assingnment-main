const express = require("express");
const {
  create,
  list,
  getsubCategory,
} = require("../controllers/subCategories");

const subCatrouter = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *    SubCategory:
 *     type: object
 *     required:
 *      - name
 *      - description
 *      - parent
 *     properties:
 *        id:
 *          type: string
 *          description: id of the subcategory
 *        name:
 *          type: string
 *          description: name of the subcategory
 *        description:
 *          type: string
 *          description: description of the subcategory
 *        parent:
 *           type: string
 *           description: parent of the subcategory
 *
 *     example:
 *        name: "SubCategory name"
 *        description: "SubCategory description"
 *        parent: "62844a64ec03ad3d94537e16"
 *
 */

/**
 * @swagger
 * tags:
 *   name: SubCategory
 *   description: SubCategory Api's
 */
subCatrouter
  .route("/")
  /**
   * @swagger
   * /sub:
   *  get:
   *   summary: get all subcategories
   *   tags: [SubCategory]
   *   description: get all subcategories populate itt's parent model 

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

  .get(list)
  /**
   * @swagger
   * /sub:
   *  post:
   *   summary: Create new SubCategory
   *   tags: [SubCategory]
   *   description: create new Subcategory with it's parent category id
   *   requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/SubCategory'
   *
   *   responses:
   *    201:
   *     description: New SubCategory created
   *    401:
   *      description: you are not authorized to access this route
   *    500:
   *     description : error
   */
  .post(create);
subCatrouter
  .route("/:id")

  /**
   * @swagger
   * /sub/{id}:
   *  get:
   *   summary: get single subcategory with populate it's parent category model
   *   tags: [SubCategory]
   *   description: get single subcategory with populate it's parent category model
   *   parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The subcategory description
   *
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

  .get(getsubCategory);

// router.get("/productcategory/:id", getProductCategory);
// router.post("/productcategory", addCategory);

module.exports = subCatrouter;
