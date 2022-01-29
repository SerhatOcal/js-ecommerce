const validate = require("../middlewares/validate"); // validate middleware
const Checker = require("../middlewares/Checker"); // validate middleware
const BrandValidation = require("../validations/Brands"); //validations
const express = require("express");
const Brand = require("../controllers/BrandController");
/* const Authentication = require("../middlewares/Authentication");
 */
const router = express.Router();
router.get("/", Brand.read);
router.route("/").post(validate(BrandValidation.create), Brand.create);
router.route("/:id").delete(Checker.IdChecker, Brand.deleted);
router.route("/:id").get(Checker.IdChecker, Brand.readOne);
router.route("/:id").patch(Checker.IdChecker, validate(BrandValidation.update), Brand.update);

module.exports = router;