const express = require("express");
// Routes
const {
  createSubCategory,
  getSubCategory,
  getSubCategoties,
  updateSubcategory,
  deleteSubcategory,
  setCategoryIdToBody,
  createFilterObj,
} = require("../services/sub_category_services");

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/sub_category_validator");

// merge parameters: Allow as to access parameters on other router
// for example we need to access the category id  from route
const router = express.Router({mergeParams: true});

router
  .route("/")
  .post(setCategoryIdToBody,createSubCategoryValidator, createSubCategory)
  .get(createFilterObj,getSubCategoties);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubcategory)
  .delete(deleteSubCategoryValidator, deleteSubcategory);

module.exports = router;
