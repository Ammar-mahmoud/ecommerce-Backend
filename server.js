const path = require('path');
const express = require("express");
const dotenv = require("dotenv");

const compression = require('compression');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');

dotenv.config({ path: "config.env" });
const morgan = require("morgan");
const dbConnection = require('./config/database');
const ApiError = require('./utils/api_error')
const globalError = require('./middlewares/error_middleware');
//db connection
const mountRouts = require('./api');

dbConnection();



// express app
const app = express();

// we want to compress all responses
app.use(compression());

// Middlewares
app.use(express.json({limit: '20kb'})); // limit response size

app.use(express.static(path.join(__dirname, 'uploads')))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// middleware to protect against HTTP Parameter Pollution attacks
app.use(hpp({whitelist: ['price', 'sold', 'quantity']}));

//to avoid brute-force attacks
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message:
    'Too many accounts created from this ip, please try again later.',
})

app.use(limiter);
app.use(mongoSanitize());
// Routes
mountRouts(app);

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
