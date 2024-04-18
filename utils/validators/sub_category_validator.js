const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Subcategory id format"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory name must")
    .isLength({ min: 2 })
    .withMessage("SubCategory name must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("SubCategory name must be at most 32 characters"),
    check('category').notEmpty().withMessage('category id is empty').isMongoId().withMessage('Invalid category id format'),
  validatorMiddleware,
];

// exports.updateSubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid Subcategory id format"),
//   validatorMiddleware,
// ];

// exports.deleteSubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid Subcategory id format"),
//   validatorMiddleware,
// ];
