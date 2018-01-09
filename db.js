var mongoose = require('mongoose');
var http = require('http');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
mongoose.Promise = global.Promise;
var conn = mongoose.connect('mongodb://localhost/koinex');

var koinex_data = mongoose.Schema({
    price: { type: Array },
    date: { type: Date },
}, {
    collection: 'koinex_data',
    strict: false
});

var koinex_data = conn.model("koinex_data", koinex_data);
module.exports = {
    koinex_data: koinex_data,
}