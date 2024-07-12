const express = require('express');

const authService = require('../services/authService');

const {createNewAddressValidator} = require('../utils/validators/address_validator');

const {
  addAddress,
  removeAddress,
  getLoggedUserAddresses,
} = require('../services/addressService');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('user'));

router.route('/').post(createNewAddressValidator,addAddress).get(getLoggedUserAddresses);

router.delete('/:addressId', removeAddress);

module.exports = router;