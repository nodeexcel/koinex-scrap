var express = require('express');
var app = express();
var router = express.Router();
var db = require('./db.js');
var graphService = require('./service/currencies.js');

router.get('/get_currency/:currency_type/:interval/:start_date/:end_date', function(req, res, next) {
    //fetching all data between two dates
    db.koinex_data.find({ date: { $gte: req.params.start_date, $lt: req.params.end_date, } }).exec(function(err, data) {
        if (err) {
            console.log(err)
            next(err);
        } else if (data.length != 0) {
            var currency = req.params.currency_type; //currency name
            var interval = parseInt(req.params.interval); //time interval (in minutes)
            var fromTime = data[0].date; //for deviding data into time intervals (interval start time)
            var totime = new Date(fromTime);
            totime.setMinutes(fromTime.getMinutes() + interval - 1); //interval end time

            graphService.getCandles(data, totime, fromTime, interval, currency, function(result) {
                res.json({ error: 0, message: "data found", data: result });
            })
        }
    })
})

module.exports = router;