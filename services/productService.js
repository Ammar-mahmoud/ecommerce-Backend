// imports

const slugify = require("slugify"); // ammar mahmoud --> ammar-mahmoud
const asyncHandler = require("express-async-handler");
const productModel = require("../models/productModel");
const ApiError = require("../utils/api_error");

exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const products = await productModel.find({}).skip(skip).limit(limit);
  res.send({ results: products.length, data: products });
  //res.send(products);
});

// specific product

exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findById(id);
  if (!product) {
    //res.status(404).json({message:`No product for ${id}`});
    return next(new ApiError(`No product for ${id}`, 404));
  }
  res.status(200).json({ data: product });
});


// all below are private 

exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await productModel.create(req.body);
  res.status(201).json({ data: product });
});

// Update specific product

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.title);

  const product = await productModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    //res.status(404).json({message:`No product for ${id}`});
    return next(new ApiError(`No product for ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// Delete specific product

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);
  if (!product) {
    //res.status(404).json({message:`No product for ${id}`});
    return next(new ApiError(`No product for ${id}`, 404));
  }
  res.status(204).send();
});
