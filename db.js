var mongoose = require('mongoose');
var http = require('http');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
mongoose.Promise = global.Promise;
var conn = mongoose.connect('mongodb://localhost/koinex');
var koinex_data = mongoose.Schema({
    price: { type: Array },
    date: { type: String },
}, {
    collection: 'koinex_data',
    strict: true
});

var BTC = mongoose.Schema({
    date: { type: String },
    close: { type: String },
    high: { type: String },
    low: { type: String },
    open: { type: String },
    volume: { type: String },
    BTC: { type: String }
}, {
    collection: 'BTC',
    strict: true
});

var ETH = mongoose.Schema({
    date: { type: String },
    close: { type: String },
    high: { type: String },
    low: { type: String },
    open: { type: String },
    volume: { type: String },
    ETH: { type: String }
}, {
    collection: 'ETH',
    strict: true
});

var XRP = mongoose.Schema({
    date: { type: String },
    close: { type: String },
    high: { type: String },
    low: { type: String },
    open: { type: String },
    volume: { type: String },
    XRP: { type: String }
}, {
    collection: 'XRP',
    strict: true
});

var LTC = mongoose.Schema({
    date: { type: String },
    close: { type: String },
    high: { type: String },
    low: { type: String },
    open: { type: String },
    volume: { type: String },
    LTC: { type: String }
}, {
    collection: 'LTC',
    strict: true
});

var BCH = mongoose.Schema({
    date: { type: String },
    close: { type: String },
    high: { type: String },
    low: { type: String },
    open: { type: String },
    volume: { type: String },
    BCH: { type: String }
}, {
    collection: 'BCH',
    strict: true
});

var koinex_data = conn.model("koinex_data", koinex_data);
var BTC = conn.model("BTC", BTC);
var ETH = conn.model("ETH", ETH);
var XRP = conn.model("XRP", XRP);
var LTC = conn.model("LTC", LTC);
var BCH = conn.model("BCH", BCH);

module.exports = {
    koinex_data: koinex_data,
    BTC: BTC,
    ETH: ETH,
    XRP: XRP,
    LTC: LTC,
    BCH: BCH,
}