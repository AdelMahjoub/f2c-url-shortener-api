const db = require('../services/db.service');
const Url = require('../models/url.model');

module.exports = function(req, res, next) {
   if(req.params['short'] === 'api') {
    return next();
  }
  let shortUrlPrefix = req.hostname === 'localhost' ? `${req.protocol}://${req.hostname}:3000` : req.hostname;
  let shortUrl = `${shortUrlPrefix}/${req.params['short']}`
  Url.findOne({short: shortUrl}, {_id: 0, __v: 0}, (err, doc) => {
    if(err || !doc) {
      return res.json({staus: 422, error: 'url not registred'});
    }
    return res.redirect(doc['full']);
  });
}