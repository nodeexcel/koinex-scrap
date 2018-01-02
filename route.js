var express = require('express');
var app = express();
var router = express.Router();
var db = require('./db.js');

router.get('/get_currency/:currency_type/:start_date/:end_date', function(req, res, next) {
    var currency = req.params.currency_type
    db[currency].find({
        date: {
            $gte: req.params.start_date,
            $lt: req.params.end_date
        }
    }).exec(function(err, data) {
        if (err) {
            console.log(err)
            next(err);
        } else if (data.length != 0) {
            var result = data.filter(function(el, index) {
                return index % 2 === 0;
            });
            res.json({ error: 0, message: "data found", data: result });
        } else {
            res.json({ error: 1, message: "data not found", data: result });
        }
    })
})

module.exports = router;