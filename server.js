require('dotenv').config();

const express   = require('express');
const shortId   = require('shortid');
const validator = require('validator');
const path      = require('path');

const app = express();

const redirectFromShort = require('./controllers/redirect-from-short.controller');
const shorten           = require('./controllers/shorten-url.controller');

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:short', redirectFromShort);

app.get('/api', shorten);

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});

