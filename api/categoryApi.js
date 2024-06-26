// Routes

const express = require("express");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/category_validator");

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage,

} = require("../services/categoryService");



const router = express.Router();

const subCategoryApi = require("./subCategoryApi");

router.use('/:categoryId/subcategories', subCategoryApi);

router
  .route("/")
  .get(getCategories)
  .post(uploadCategoryImage,resizeImage, createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(uploadCategoryImage,resizeImage,updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
