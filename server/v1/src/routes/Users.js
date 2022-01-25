const validate = require("../middlewares/validate"); // validate middleware
const Checker = require("../middlewares/checker");
const Authentication = require("../middlewares/Authentication");
const UserValidation = require("../validations/Users"); //validations
const express = require("express");
const Users = require("../controllers/UserController");

const router = express.Router();
router.get("/", Authentication.authenticated, Users.read);
router.route("/").post(validate(UserValidation.create), Users.create);
router.route("/:id").patch(Checker.IdChecker, Authentication.authenticated, validate(UserValidation.update), Users.update);
router.route("/:id").delete(Checker.IdChecker, Authentication.authenticated, Users.deleted);
router.route("/login").post(validate(UserValidation.login), Users.login);
router.route("/reset-password").post(validate(UserValidation.resetPassword), Users.resetPassword);
router.route("/change-password").post(Authentication.authenticated, Users.changePassword);

module.exports = router;
