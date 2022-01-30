const validate = require("../middlewares/validate"); // validate middleware
const Checker = require("../middlewares/Checker"); // validate middleware
const CategoryValidation = require("../validations/Categories"); //validations
const express = require("express");
const Category = require("../controllers/CategoryController");
/* const Authentication = require("../middlewares/Authentication");
 */
const router = express.Router();
router.get("/", Category.read);
router.route("/").post(validate(CategoryValidation.create), Category.create);
router.route("/:id").delete(Checker.IdChecker, Category.deleted);
router.route("/:id").get(Checker.IdChecker, Category.readOne);
router.route("/:id").patch(Checker.IdChecker, validate(CategoryValidation.update), Category.update);

module.exports = router;