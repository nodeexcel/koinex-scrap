var express = require('express');
var app = express();
var router = express.Router();
var db = require('./db.js');
var graphService = require('./service/currencies.js');
var moment = require('moment-timezone');

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


router.get('/date_update', function(req, res, next) {
    db.koinex_data.find({ is_processed: { "$exists": false } }).limit(2000).exec(function(err, data) {
        if (err) {
            console.log(err)
            next(err);
        } else if (data) {
            if (data.length != 0) {
                for (var k in data) {
                    var change_date = moment(data[k].date);
                    var dateTime = new Date(Date.UTC(change_date.get('year'), change_date.get('month'), change_date.get('date'), change_date.get('hour'), change_date.get('minute')))
                    db.koinex_data.update({ _id: data[k]._id }, { $set: { date: dateTime, 'is_processed': 1 } }, function(err, result) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("=====", result)
                        }
                    })
                }
                res.json({ error: 0, message: "date updated" })
            } else {
                res.json({ message: "no more data found" })
            }
        }
    })
})

module.exports = router;