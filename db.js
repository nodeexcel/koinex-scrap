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
    date: { type: Date },
    close: { type: Number },
    high: { type: Number },
    low: { type: Number },
    open: { type: Number },
    volume: { type: Number },
    BTC: { type: Number }
}, {
    collection: 'BTC',
    strict: true
});

var ETH = mongoose.Schema({
    date: { type: Date },
    close: { type: Number },
    high: { type: Number },
    low: { type: Number },
    open: { type: Number },
    volume: { type: Number },
    ETH: { type: Number }
}, {
    collection: 'ETH',
    strict: true
});

var XRP = mongoose.Schema({
    date: { type: Date },
    close: { type: Number },
    high: { type: Number },
    low: { type: Number },
    open: { type: Number },
    volume: { type: Number },
    XRP: { type: Number }
}, {
    collection: 'XRP',
    strict: true
});

var LTC = mongoose.Schema({
    date: { type: Date },
    close: { type: Number },
    high: { type: Number },
    low: { type: Number },
    open: { type: Number },
    volume: { type: Number },
    LTC: { type: Number }
}, {
    collection: 'LTC',
    strict: true
});

var BCH = mongoose.Schema({
    date: { type: Date },
    close: { type: Number },
    high: { type: Number },
    low: { type: Number },
    open: { type: Number },
    volume: { type: Number },
    BCH: { type: Number }
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