const path = require('path');
const express = require("express");
const dotenv = require("dotenv");

const cors = require('cors')
const compression = require('compression');

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

//enable other domains to access my app
app.use(cors());
app.options('*', cors());
 
// we want to compress all responses
app.use(compression());

// Middlewares
app.use(express.json());

app.use(express.static(path.join(__dirname, 'uploads')))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

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
