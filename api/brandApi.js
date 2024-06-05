// Routes

const express = require("express");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brand_validator");

const {
  getbrand,
  createbrand,
  updatebrand,
  deletebrand,
  getbrands,
} = require("../services/brandService");

const router = express.Router();


router
  .route("/")
  .get(getbrands)
  .post(createBrandValidator, createbrand);
router
  .route("/:id")
  .get(getBrandValidator, getbrand)
  .put(updateBrandValidator, updatebrand)
  .delete(deleteBrandValidator, deletebrand);

module.exports = router;
