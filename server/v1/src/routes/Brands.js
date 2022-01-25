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


module.exports = router;

/*
router.route("/:id").patch(Checker.IdChecker, Authentication.authenticated, validate(UserValidation.update), Users.update);
router.route("/login").post(validate(UserValidation.login), Users.login);
router.route("/reset-password").post(validate(UserValidation.resetPassword), Users.resetPassword);
router.route("/change-password").post(Authentication.authenticated, Users.changePassword);
*/
