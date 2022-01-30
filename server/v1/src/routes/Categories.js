const validate = require("../middlewares/validate"); // validate middleware
const Checker = require("../middlewares/Checker"); // validate middleware
const CategoryValidation = require("../validations/Categories"); //validations
const express = require("express");
const Category = require("../controllers/CategoryController");
/* const Authentication = require("../middlewares/Authentication");
 */
const router = express.Router();
router.get("/", Category.read);
/*
router.route("/").post(validate(BrandValidation.create), Brands.create);
router.route("/:id").delete(Checker.IdChecker, Brands.deleted);
router.route("/:id").get(Checker.IdChecker, Brands.readOne);
router.route("/:id").patch(Checker.IdChecker, validate(BrandValidation.update), Brands.update); */

module.exports = router;