const sendErrorForDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.statusCode,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorForProd = (err, res) =>
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.Node_ENV === "development") {
    sendErrorForDev(err, req);
  } else {
    sendErrorForProd(err, req);
  }
};

module.exports = globalError;
