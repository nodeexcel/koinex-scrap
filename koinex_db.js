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

var calculated_data = mongoose.Schema({
    calculated: { type: Array },
}, {
    collection: 'calculated_data',
    strict: false
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

var get_data = conn.model("get_data", koinex_data);
var get_desired = conn.model("get_desired", calculated_data);
var get_BTC = conn.model("get_BTC", BTC);
var get_ETH = conn.model("get_ETH", ETH);
var get_XRP = conn.model("get_XRP", XRP);
var get_LTC = conn.model("get_LTC", LTC);
var get_BCH = conn.model("get_BCH", BCH);

module.exports = {
    fetch: get_data,
    get_detailed_data: get_desired,
    BTC_data: get_BTC,
    ETH_data: get_ETH,
    XRP_data: get_XRP,
    LTC_data: get_LTC,
    BCH_data: get_BCH,
}