// Routes

const express = require("express");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brand_validator");

const {
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  getBrands,
  uploadBrandImage,
  resizeImage,
} = require("../services/brandService");

const router = express.Router();


router
  .route("/")
  .get(getBrands)
  .post(uploadBrandImage,resizeImage,createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(uploadBrandImage,resizeImage,updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
