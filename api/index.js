const categoryRoute = require('./categoryApi');
const brandRoute = require('./brandApi');
const subCategoryRoute = require('./subCategoryApi')
const productRoute = require('./productApi')
const userRoute = require('./userApi')
const authRoute = require('./authApi')
const reviewRoute = require('./reviewApi')
const wishlistRoute = require('./wishlistApi')
const addressRoute = require('./addressApi')
const couponRoute = require('./couponApi')
const cartRoute = require('./cartApi')



const mountRouts = (app) => {
  app.use("/api/v1/subcategories", subCategoryRoute);
  app.use("/api/v1/categories", categoryRoute);
  app.use("/api/v1/brands", brandRoute);
  app.use("/api/v1/products", productRoute);
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/reviews", reviewRoute);
  app.use("/api/v1/wishlists", wishlistRoute);
  app.use("/api/v1/address", addressRoute);
  app.use("/api/v1/coupons", couponRoute);
  app.use("/api/v1/cart", cartRoute);
};

module.exports = mountRouts;