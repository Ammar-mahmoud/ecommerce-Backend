const express = require("express");

const {
  createSubCategory,
  getSubCategory,
  getSubCategoties,
} = require("../services/sub_category_services");

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
} = require("../utils/validators/sub_category_validator");

const router = express.Router();

router
  .route("/")
  .post(createSubCategoryValidator, createSubCategory)
  .get(getSubCategoties);
router.route("/:id").get(getSubCategoryValidator, getSubCategory);

module.exports = router;
