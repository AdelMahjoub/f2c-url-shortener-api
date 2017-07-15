const db = require('../services/db.service');
const validator = require('validator');
const shortId = require('shortid');

const UrlSchema = db.Schema({
  full: {
    type: String,
    unique: true,
    validate: {
      validator: function(value) {
        return validator.isURL(value, {require_protocol: true});
      },
      msg: 'Not a valid url'
    }
  },
  short: {
    unique: true,
    type: String
  } 
});

const Url = db.model('Url', UrlSchema);

module.exports = Url;