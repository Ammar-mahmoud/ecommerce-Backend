const express = require("express");

const {
  getCategoties,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

const router = express.Router();

router.route("/").get(getCategoties).post(createCategory);
router.route("/:id").get(getCategory).put(updateCategory).delete(deleteCategory);
module.exports = router;
