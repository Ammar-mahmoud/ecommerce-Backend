const mongoose = require("mongoose");

const dbConnection = () => {
    mongoose
  .connect(process.env.DB_URI)
  .then((conn) => {
    console.log(`database connection: ${conn.connection.host}`);
  })
  .catch((err) => {
    console.error(`fail: ${err}`);
    process.exit(1);
  });
};

module.exports = dbConnection;