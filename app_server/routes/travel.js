var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

//var express = require('express');
//var router = express.Router();
//var controller = require('../controllers/travel');

/* GET travel page. */
const travel = (req, res) => { res.render('travel', { title: 'Travelr Gateways', trips})};
//router.get('/', controller.travel);

module.exports = travel;