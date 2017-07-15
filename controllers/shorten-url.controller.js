const db = require('../services/db.service');
const Url = require('../models/url.model');

module.exports = function(req, res, next) {
  if(!req.query.hasOwnProperty('url')) {
    return res.json({status: 400, error: 'bad request'});
  }
  Url.findOne({full: req.query['url']}, {_id: 0, __v: 0},(err, doc) => {
    if(err) {
      return res.json({status: 500, error: 'unexpected error, please try again'});
    }
    if(doc) {
      return res.json(doc);
    }
    let randomAndUniqueId = shortId.generate();
    let shortUrlPrefix = req.hostname === 'localhost' ? `${req.protocol}://${req.hostname}:3000` : req.hostname;
    let newUrl = new Url({
      full: req.query['url'],
      short: `${shortUrlPrefix}/${randomAndUniqueId}`
    });
    Url.create(newUrl, (err, created) => {
      if(err) {
        let errors = [];
        Object.keys(err.errors).forEach(key => {
          errors.push(err.errors[key]['message']);
        });
        return res.json({status: 422, errors});
      }
      return res.json({
        full: created['full'],
        short: created['short']
      });
    });
  });
}