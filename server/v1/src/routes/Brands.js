const validate = require("../middlewares/validate"); // validate middleware
const Checker = require("../middlewares/Checker"); // validate middleware
const BrandValidation = require("../validations/Brands"); //validations
const express = require("express");
const Brands = require("../controllers/BrandController");
const authenticate = require("../middlewares/Authentication");

const router = express.Router();
router.get("/", Brands.read);
router.route("/").post(validate(BrandValidation.create), Brands.create);
router.route("/:id").delete(Checker.IdChecker, Brands.deleted);
router.route("/:id").get(Checker.IdChecker, Brands.readOne);
router.route("/:id").patch(Checker.IdChecker, validate(BrandValidation.update), Brands.update);

module.exports = router;

/*
router.route("/login").post(validate(UserValidation.login), Users.login);
router.route("/reset-password").post(validate(UserValidation.resetPassword), Users.resetPassword);
router.route("/change-password").post(Authentication.authenticated, Users.changePassword);
*/
