const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const options = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  server: {
    socketOptions: {
      keepAlive: 1
    }
  }
};

const db = mongoose.connect(process.env.DB_URL, options);

module.exports = db;