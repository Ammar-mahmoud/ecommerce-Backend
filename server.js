const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const morgan = require("morgan");
const dbConnection = require('./config/database');
const categoryRoute = require('./api/categoryApi');
const ApiError = require('./utils/api_error')
const globalError = require('./middlewares/error_middleware');

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

app.use('/api/v1/categories', categoryRoute);
app.all("*", (req, res, next) => {
  // create error and send it to error handling middleware
  next(new ApiError("message", statusCode));
})

// Global error handle middlewares return error as you like
app.use(globalError)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App running on Port ${PORT}`);
});
