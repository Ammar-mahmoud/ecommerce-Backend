const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createNewAddressValidator = [
  check("alias").notEmpty().withMessage("Please enter a valid name to address"),
  check("postCode")
    .notEmpty()
    .withMessage("please enter postCode"),
  check("phone")
    .notEmpty()
    .withMessage("Please enter a phone number")
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy and SA Phone numbers"),
  validatorMiddleware,
];
