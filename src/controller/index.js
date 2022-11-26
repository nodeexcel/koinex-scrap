var db = require('../model');
module.exports = function (req, res, next) {
    db.fetch.find({}).exec(function (err, data) {
        if (err) {
            next(err);
        } else if (data) {
            res.json({ error: 0, message: "data found", data: data });
        }
    })
}