const slugify = require("slugify"); // ammar mahmoud --> ammar-mahmoud
const asyncHandler = require("express-async-handler");
const subCategoryModel = require("../models/sub_category");
const ApiError = require("../utils/api_error");

exports.setCategoryIdToBody = (req, res, next) => {
  // Nested route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

exports.getSubCategoties = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await subCategoryModel.find(req.filterObj)
  .skip(skip)
  .limit(limit);
// .populate({ path: 'category', select: 'name -_id' });

res
  .status(200)
  .json({ results: subCategories.length, page, data: subCategories });
});

// specific subcategory

exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await subCategoryModel.findById(id);
  // .populate({ path: "category", select: "name -_id" });
  if (!subcategory) {
    //res.status(404).json({message:`No category for ${id}`});
    return next(new ApiError(`No category for ${id}`, 404));
  }
  res.status(200).json({ data: subcategory });
});

exports.updateSubcategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subcategory = await subCategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category: category },
    { new: true }
  );
  if (!subcategory) {
    //res.status(404).json({message:`No subcategory for ${id}`});
    return next(new ApiError(`No category for ${id}`, 404));
  }
  res.status(200).json({ data: subcategory });
});

// Delete specific category

exports.deleteSubcategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await subCategoryModel.findByIdAndDelete(id);
  if (!subcategory) {
    //res.status(404).json({message:`No subcategory for ${id}`});
    return next(new ApiError(`No category for ${id}`, 404));
  }
  res.status(204).send();
});
