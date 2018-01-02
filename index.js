var express = require('express');
var app = express();
var router = express.Router();
var db = require('./koinex_db');
var phantomjs = require('phantomjs');
var moment = require('moment-timezone');
var cron = require('node-cron');


router.get('/get_btc/:start_date/:end_date', function(req, res, next) {
    db.BTC_data.find({
        date: {
            $gte: req.params.start_date,
            $lt: req.params.end_date
        }
    }).exec(function(err, data) {
        if (err) {
            console.log(err)
            next(err);
        } else if (data) {
            var result = data.filter(function(el, index) {
                return index % 2 === 0;
            });
            res.json({ error: 0, message: "data found", data: result });
        } else {
            res.json({ error: 1, message: "data not found", data: result });
        }
    })
})

router.get('/get_eth/:start_date/:end_date', function(req, res, next) {
    db.ETH_data.find({
        date: {
            $gte: req.params.start_date,
            $lt: req.params.end_date
        }
    }).exec(function(err, data) {
        if (err) {
            console.log(err)
            next(err);
        } else if (data) {
            var result = data.filter(function(el, index) {
                return index % 2 === 0;
            });
            res.json({ error: 0, message: "data found", data: result });
        } else {
            res.json({ error: 1, message: "data not found", data: result });
        }
    })
})

router.get('/get_xrp/:start_date/:end_date', function(req, res, next) {
    db.XRP_data.find({
        date: {
            $gte: req.params.start_date,
            $lt: req.params.end_date
        }
    }).exec(function(err, data) {
        if (err) {
            console.log(err)
            next(err);
        } else if (data) {
            var result = data.filter(function(el, index) {
                return index % 2 === 0;
            });
            res.json({ error: 0, message: "data found", data: result });
        } else {
            res.json({ error: 1, message: "data not found", data: result });
        }
    })
})

router.get('/get_ltc/:start_date/:end_date', function(req, res, next) {
    db.LTC_data.find({
        date: {
            $gte: req.params.start_date,
            $lt: req.params.end_date
        }
    }).exec(function(err, data) {
        if (err) {
            console.log(err)
            next(err);
        } else if (data) {
            var result = data.filter(function(el, index) {
                return index % 2 === 0;
            });
            res.json({ error: 0, message: "data found", data: result });
        } else {
            res.json({ error: 1, message: "data not found", data: result });
        }
    })
})

router.get('/get_bch/:start_date/:end_date', function(req, res, next) {
    db.BCH_data.find({
        date: {
            $gte: req.params.start_date,
            $lt: req.params.end_date
        }
    }).exec(function(err, data) {
        if (err) {
            console.log(err)
            next(err);
        } else if (data) {
            var result = data.filter(function(el, index) {
                return index % 2 === 0;
            });
            res.json({ error: 0, message: "data found", data: result });
        } else {
            res.json({ error: 1, message: "data not found", data: result });
        }
    })
})

router.get('/seperate_collections', function(req, res, next) {
    db.get_detailed_data.find({ is_processed: { "$exists": false } }).limit(500).exec(function(err, data) {
        if (err) {
            console.log(err)
            next(err);
        } else if (data) {
            if (data.length != 0) {
                for (var k in data) {
                    var prices = data[k].calculated[0].price;
                    var change_date = moment(new Date(data[k].calculated[0].date)).tz('Asia/Kolkata').format()
                    for (var a in prices) {
                        prices[a].date = change_date;
                        if (prices[a].BTC) {
                            var separate_prices = { 'BTC': prices[a].BTC, 'volume': prices[a].volume, 'open': prices[a].open, 'low': prices[a].low, 'high': prices[a].high, 'close': prices[a].close, 'date': change_date }
                            BTC_data = new db.BTC_data(separate_prices);
                            BTC_data.save(function(err, take) {
                                if (err) {
                                    console.log(err)
                                }
                            })
                        }
                        if (prices[a].ETH) {
                            var separate_prices = { 'ETH': prices[a].ETH, 'volume': prices[a].volume, 'open': prices[a].open, 'low': prices[a].low, 'high': prices[a].high, 'close': prices[a].close, 'date': change_date }
                            ETH_data = new db.ETH_data(separate_prices);
                            ETH_data.save(function(err, take) {
                                if (err) {
                                    console.log(err)
                                }
                            })
                        }
                        if (prices[a].XRP) {
                            var separate_prices = { 'XRP': prices[a].XRP, 'volume': prices[a].volume, 'open': prices[a].open, 'low': prices[a].low, 'high': prices[a].high, 'close': prices[a].close, 'date': change_date }
                            XRP_data = new db.XRP_data(separate_prices);
                            XRP_data.save(function(err, take) {
                                if (err) {
                                    console.log(err)
                                }
                            })
                        }
                        if (prices[a].LTC) {
                            var separate_prices = { 'LTC': prices[a].LTC, 'volume': prices[a].volume, 'open': prices[a].open, 'low': prices[a].low, 'high': prices[a].high, 'close': prices[a].close, 'date': change_date }
                            LTC_data = new db.LTC_data(separate_prices);
                            LTC_data.save(function(err, take) {
                                if (err) {
                                    console.log(err)
                                }
                            })
                        }
                        if (prices[a].BCH) {
                            var separate_prices = { 'BCH': prices[a].BCH, 'volume': prices[a].volume, 'open': prices[a].open, 'low': prices[a].low, 'high': prices[a].high, 'close': prices[a].close, 'date': change_date }
                            BCH_data = new db.BCH_data(separate_prices);
                            BCH_data.save(function(err, take) {
                                if (err) {
                                    console.log(err)
                                }
                            })
                        }
                    }
                    db.get_detailed_data.update({ _id: data[k]._id }, { $set: { 'is_processed': 1 } }, function(err, result) {


                    })
                    if (k == data.length - 1) {
                        res.json({ error: 0, message: "inserted" });
                    }

                }
            } else {
                res.json({ error: 0, message: "no more data found" });
            }
        }
    })
})

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
        //below variables are used for storing data for different currencies which is scrapped every minute
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

        //below code is for getting current time and time before 2 minute
        var date_time = moment(new Date()).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm');
        var to_date = moment(new Date().getTime() - 1000 * 60 * 2).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm');

        //below code is for storing currencies and date, coming every minute to store in db
        koinex_data = new db.fetch({
            price: prices,
            date: date_time,
        })

        //below code is for finding the value for high, low, open ,close data
        // query to find the data for last two minute
        db.fetch.find({ date: { $gte: to_date, $lt: date_time, } }).sort({ _id: -1 }).exec(function(err, last_added) {
            //if data found for last two minutes then it will start to calculate required data else it will not calculate
            if (last_added.length == 2) {
                //first save the data coming every minute in db
                koinex_data.save(function(err, result) {
                    if (err) {
                        console.log(err)
                    } else {
                        var change_date = moment(new Date(last_added[1].date)).tz('Asia/Kolkata').format()
                        for (var k in last_added[1].price) {
                            if (k < 5) {
                                //if price before two minutes are less then the price before one minute, then store the price before two minutes as the low, and price before one minute as high
                                if (last_added[1].price[k].open < last_added[0].price[k].open) {
                                    last_added[1].price[k].low = last_added[1].price[k].open;
                                    last_added[1].price[k].high = last_added[0].price[k].open;
                                }
                                //if price before two minutes are greater then the price before one minute, then store price before two minutes as the high, and price before one minute as low 
                                else {
                                    last_added[1].price[k].low = last_added[0].price[k].open;
                                    last_added[1].price[k].high = last_added[1].price[k].open;
                                }
                                //store the open value of data coming in current minute as the closing value for the data before two minute
                                last_added[1].price[k].close = result.price[k].open;
                                last_added[1].price[k].date = change_date;
                                if (last_added[1].price[k].BTC) {
                                    BTC_data = new db.BTC_data(last_added[1].price[k]);
                                    BTC_data.save(function(err, take) {
                                        if (err) {
                                            console.log(err)
                                        }
                                    })
                                }
                                if (last_added[1].price[k].ETH) {
                                    ETH_data = new db.ETH_data(last_added[1].price[k]);
                                    ETH_data.save(function(err, take) {
                                        if (err) {
                                            console.log(err)
                                        }
                                    })
                                }
                                if (last_added[1].price[k].XRP) {
                                    XRP_data = new db.XRP_data(last_added[1].price[k]);
                                    XRP_data.save(function(err, take) {
                                        if (err) {
                                            console.log(err)
                                        }
                                    })
                                }
                                if (last_added[1].price[k].LTC) {
                                    LTC_data = new db.LTC_data(last_added[1].price[k]);
                                    LTC_data.save(function(err, take) {
                                        if (err) {
                                            console.log(err)
                                        }
                                    })
                                }
                                if (last_added[1].price[k].BCH) {
                                    BCH_data = new db.BCH_data(last_added[1].price[k]);
                                    BCH_data.save(function(err, take) {
                                        if (err) {
                                            console.log(err)
                                        }
                                    })
                                }
                            }
                        }
                        // //get the calculated data to store in db
                        // calculated_data = new db.get_detailed_data({
                        //     calculated: last_added[1]
                        // })
                        // //save data in db after calculation in differnet collection
                        // calculated_data.save(function(err, take) {
                        //     if (err) {
                        //         console.log(err)
                        //     }
                        // })
                    }
                })
            }
            //if data is not found for last two minutes then no need to calculate just store the data coming every minute in db 
            else {
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