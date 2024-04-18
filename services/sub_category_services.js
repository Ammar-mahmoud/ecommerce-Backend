const slugify = require("slugify"); // ammar mahmoud --> ammar-mahmoud
const asyncHandler = require("express-async-handler");
const subCategoryModel = require("../models/sub_category");
const ApiError = require("../utils/api_error");

exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: category });
});

exports.getSubCategoties = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const categories = await subCategoryModel.find({}).skip(skip).limit(limit);
    res.send({ results: categories.length, data: categories });
    //res.send(categories);
  });
  
  // specific subcategory
  
  exports.getSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subcategory = await subCategoryModel.findById(id);
    if (!subcategory) {
      //res.status(404).json({message:`No category for ${id}`});
      return next(new ApiError(`No category for ${id}`, 404));
    }
    res.status(200).json({ data: subcategory });
  });