var express = require('express');
var app = express();
var router = express.Router();
var db = require('./koinex_db');
var phantomjs = require('phantomjs');
var moment = require('moment-timezone');
var cron = require('node-cron');

router.get('/fetch/koinex', function(req, res, next) {
    db.get_detailed_data.find({}).exec(function(err, data) {
        if (err) {
            next(err);
        } else if (data) {
            var result = data.filter(function(el, index) {
                return index % 2 === 0;
            });
            res.json({ error: 0, message: "data found", data: result });
        }
    })
});

try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}

function doScrap(URL, callback) {
    var spooky = new Spooky({
        child: {
            transport: 'http'
        },
        casper: {
            logLevel: 'debug',
            verbose: true,
        }
    }, function(err) {
        if (err) {
            e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
        }
        spooky.start('https://koinex.in/api/ticker');
        spooky.then(function() {
            this.emit('output', this.evaluate(function() {
                return JSON.parse(document.body.textContent);
            }));
        });
        spooky.run();
    });
    spooky.on('error', function(e, stack) {
        if (stack) {}
    });
    spooky.on('console', function(line) {});

    spooky.on('output', function(body) {
        var prices = [];
        var BTC = {
            "open": body.prices.BTC,
            "volume": body.stats.BTC.vol_24hrs,
            "BTC": body.prices.BTC
        };
        var ETH = {
            "open": body.prices.ETH,
            "volume": body.stats.ETH.vol_24hrs,
            "ETH": body.prices.ETH
        };
        var XRP = {
            "open": body.prices.XRP,
            "volume": body.stats.XRP.vol_24hrs,
            "XRP": body.prices.XRP
        };
        var LTC = {
            "open": body.prices.LTC,
            "volume": body.stats.LTC.vol_24hrs,
            "LTC": body.prices.LTC
        };
        var BCH = {
            "open": body.prices.BCH,
            "volume": body.stats.BCH.vol_24hrs,
            "BCH": body.prices.BCH
        };
        prices.push(BTC, ETH, XRP, LTC, BCH);
        var date_time = moment(new Date()).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm');
        var to_date = moment(new Date().getTime() - 1000 * 60 * 2).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm');
        koinex_data = new db.fetch({
            price: prices,
            date: date_time,
        })
        db.fetch.find({ date: { $gte: to_date, $lt: date_time, } }).sort({ _id: -1 }).exec(function(err, last_added) {
            if (last_added.length == 2) {
                koinex_data.save(function(err, result) {
                    if (err) {
                        console.log(err)
                    } else {
                        for (var k in last_added[1].price) {
                            if (k < 5) {
                                if (last_added[1].price[k].open < last_added[0].price[k].open) {
                                    last_added[1].price[k].low = last_added[1].price[k].open;
                                    last_added[1].price[k].high = last_added[0].price[k].open;
                                } else {
                                    last_added[1].price[k].low = last_added[0].price[k].open;
                                    last_added[1].price[k].high = last_added[1].price[k].open;
                                }
                                last_added[1].price[k].close = result.price[k].open;
                            }
                        }
                        calculated_data = new db.get_detailed_data({
                            calculated: last_added[1]
                        })
                        calculated_data.save(function(err, take) {
                            if (err) {
                                console.log(err)
                            }
                        })
                    }
                })
            } else {
                koinex_data.save(function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                })
            }
        })
        callback(prices);
    });
    spooky.on('log', function(log) {
        if (log.space === 'remote') {
            console.log(log.message.replace(/ \- .*/, ''));
        }
    });
}

cron.schedule('*/1 * * * *', function() {
    doScrap('', function(output) {})
});

module.exports = router;