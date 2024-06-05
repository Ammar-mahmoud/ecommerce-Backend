// imports

const slugify = require("slugify"); // ammar mahmoud --> ammar-mahmoud
const asyncHandler = require("express-async-handler");
const brandModel = require("../models/brandModel");
const ApiError = require("../utils/api_error");

exports.getbrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const brands = await brandModel.find({}).skip(skip).limit(limit);
  res.send({ results: brands.length, data: brands });
  //res.send(categories);
});

// specific brand

exports.getbrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findById(id);
  if (!brand) {
    //res.status(404).json({message:`No brand for ${id}`});
    return next(new ApiError(`No brand for ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

exports.createbrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await brandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});


// Update specific brand

exports.updatebrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await brandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    //res.status(404).json({message:`No brand for ${id}`});
    return next(new ApiError(`No brand for ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// Delete specific brand

exports.deletebrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findByIdAndDelete(id);
  if (!brand) {
    //res.status(404).json({message:`No brand for ${id}`});
    return next(new ApiError(`No brand for ${id}`, 404));
  }
  res.status(204).send();
});
