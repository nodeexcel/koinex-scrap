var db = require('./db');
var phantomjs = require('phantomjs');
var moment = require('moment-timezone');
var cron = require('node-cron');
var spooky_doscrap = require('./service/spooky.js');

cron.schedule('*/1 * * * *', function() {
    spooky_doscrap.scraping('', function(body) {
        var prices = [];
        //below variables are used for storing data for different currencies which is scrapped every minute
        var BTC = {
            "volume": body.stats.BTC.vol_24hrs,
            "BTC": body.prices.BTC
        };
        var ETH = {
            "volume": body.stats.ETH.vol_24hrs,
            "ETH": body.prices.ETH
        };
        var XRP = {
            "volume": body.stats.XRP.vol_24hrs,
            "XRP": body.prices.XRP
        };
        var LTC = {
            "volume": body.stats.LTC.vol_24hrs,
            "LTC": body.prices.LTC
        };
        var BCH = {
            "volume": body.stats.BCH.vol_24hrs,
            "BCH": body.prices.BCH
        };
        prices.push(BTC, ETH, XRP, LTC, BCH);

        var date_time = moment().tz('Asia/Kolkata');
        var dateTime = new Date(Date.UTC(date_time.get('year'), date_time.get('month'), date_time.get('date'), date_time.get('hour'), date_time.get('minute')))
        koinex_data = new db.koinex_data({
            price: prices,
            date: dateTime,
        })
        koinex_data.save(function(err, result) {
            if (err) {
                console.log(err);
            }
        })
    })
});