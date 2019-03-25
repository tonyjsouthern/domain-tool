var axios           = require('axios');
var bodyParser      = require('body-parser');
var express         = require('express');
var path            = require('path');
var dns             = require('dns').promises;
var Connection      = require('tedious').Connection;
var sql             = require('sequelize');
var handlers        = require('./routelist.js');
var hers            = require('./lib/hers.js');
var queries         = require('./lib/queries.js')
var cheerio         = require('cheerio')
require('dotenv').config();

//---------- app setup ---------- //
// create express app
var app = express();

// Tell the application to use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Host the following directory to access application
app.use(express.static(path.join(__dirname, '/public')));

// Make express allow connections from all origins
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//---------- Use Middleware ----------//
app.use(function(req, res, next) {
  req.$scope      = {};
  req.dns         = dns;
  req.dkim        = hers;
  req.axios       = axios;
  req.sql         = sql;
  req.cheerio     = cheerio;
  req.queries     = queries;
  return next();
});

//-------------- Routes --------------//
app.get('/get-customers', handlers.getCustomers);
app.get('/dkim/:domain', handlers.getDkim);
app.get('/spf/:domain', handlers.getSpf);
app.get('/cname/:domain', handlers.getCname);
app.get('/cnamesingular/:domain', handlers.getCnameSingular);
app.get('/whois/:domain', handlers.whois);

app.post('/tracking', handlers.checkTracking);
app.post('/drt', handlers.drt);
app.post('/cqt', handlers.cqt);
app.post('/campaignstatus', handlers.campaignStatus)
app.post('/campaigncount', handlers.campaignCount)

// Routes Specifc to reset tool
app.post('/guardedWatch', handlers.guardedWatch);
app.post('/deleted', handlers.deleted);
app.post('/validation', handlers.validation);
app.post('/supression', handlers.supression);
app.post('/optout', handlers.optout);
app.post('/softBounce', handlers.softBounce);
app.post('/hardBounce', handlers.hardBounce);
app.post('/delstatus', handlers.delstatus);

//---------- Start Server ----------//
app.listen(process.env.PORT || 3000);
console.log("Listening on port 3000");
