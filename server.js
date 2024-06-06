const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });
const morgan = require("morgan");
const dbConnection = require('./config/database');
const categoryRoute = require('./api/categoryApi');
const brandRoute = require('./api/brandApi');
const ApiError = require('./utils/api_error')
const globalError = require('./middlewares/error_middleware');
const subCategoryRoute = require('./api/subCategoryApi')
const productRoute = require('./api/productApi')
//db connection

dbConnection();



// express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}


// Routes

app.use('/api/v1/subcategories', subCategoryRoute);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/brands', brandRoute);
app.use('/api/v1/products', productRoute);
app.all("*", (req, res, next) => {
  // create error and send it to error handling middleware
  next(new ApiError(`can't find this end point: ${req.originalUrl}`, 400));
})

// Global error handle middlewares return error as you like
app.use(globalError)

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`App running on Port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error(`fail: ${err.name} | ${err.message}`);
  server.close(()=>{
    console.log(`app shutting down....`);
    process.exit(1);
  });
  
})
